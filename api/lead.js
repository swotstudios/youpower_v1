/**
 * POST /api/lead — crea un crm.lead in Odoo a partire dal form della landing.
 *
 * Le credenziali arrivano solo da variabili d'ambiente e restano sul server:
 * ODOO_URL, ODOO_DB, ODOO_UID, ODOO_API_KEY (vedi .env.example).
 *
 * Odoo di YouPower e' alla versione 18.0 (verificata su
 * /web/webclient/version_info), quindi si usa JSON-RPC: service "object",
 * metodo execute_kw, modello crm.lead, metodo create.
 * Dalla 19 in poi servirebbe invece la JSON-2 API
 * (POST /json/2/crm.lead/create con header Authorization: bearer <API_KEY>).
 */

var TIMEOUT_MS = 10000;
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildDescription(data) {
  var rows = [
    ['Tipo di proprieta', data.proprieta],
    ['Consumo energetico annuale', data.consumoNonSoDichiarato ? 'Non lo so (dichiarato dal contatto)' : data.consumo],
    ['Pagina', data.pageUrl]
  ];
  var utm = [
    ['utm_source', data.utm_source],
    ['utm_medium', data.utm_medium],
    ['utm_campaign', data.utm_campaign]
  ].filter(function (row) { return row[1]; });

  var lines = rows
    .filter(function (row) { return row[1]; })
    .map(function (row) { return escapeHtml(row[0]) + ': ' + escapeHtml(row[1]); });

  if (utm.length) {
    lines.push('');
    lines.push('UTM');
    utm.forEach(function (row) { lines.push(escapeHtml(row[0]) + ': ' + escapeHtml(row[1])); });
  }

  return '<p>' + lines.join('<br>') + '</p>';
}

async function odooCreateLead(env, values) {
  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);

  try {
    var response = await fetch(env.url.replace(/\/+$/, '') + '/jsonrpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        id: Date.now(),
        params: {
          service: 'object',
          method: 'execute_kw',
          args: [env.db, env.uid, env.apiKey, 'crm.lead', 'create', [values]]
        }
      })
    });

    if (!response.ok) {
      throw new Error('Odoo HTTP ' + response.status);
    }

    var payload = await response.json();
    if (payload.error) {
      var detail = payload.error.data && payload.error.data.message
        ? payload.error.data.message
        : payload.error.message;
      throw new Error('Odoo RPC: ' + detail);
    }
    return payload.result;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  var body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  /* Honeypot: i bot compilano anche i campi nascosti. Rispondiamo come se
     fosse andato tutto bene, senza creare nulla in Odoo. */
  if (str(body.website)) {
    console.warn('[lead] scartata: honeypot compilato');
    return res.status(200).json({ ok: true });
  }

  var data = {
    nome: str(body.nome),
    cognome: str(body.cognome),
    email: str(body.email),
    telefono: str(body.telefono),
    proprieta: str(body.proprieta),
    consumo: str(body.consumo),
    consumoNonSoDichiarato: body.consumoNonSo === true || body.consumoNonSo === '1',
    privacy: body.privacy === true || body.privacy === '1',
    pageUrl: str(body.pageUrl),
    utm_source: str(body.utm_source).slice(0, 120),
    utm_medium: str(body.utm_medium).slice(0, 120),
    utm_campaign: str(body.utm_campaign).slice(0, 120)
  };

  var invalid = [];
  if (!data.nome) { invalid.push('nome'); }
  if (!data.cognome) { invalid.push('cognome'); }
  if (!EMAIL_RE.test(data.email)) { invalid.push('email'); }
  if (data.telefono.replace(/\D/g, '').length < 8) { invalid.push('telefono'); }
  if (!data.privacy) { invalid.push('privacy'); }
  if (invalid.length) {
    console.warn('[lead] dati non validi:', invalid.join(', '));
    return res.status(400).json({ ok: false, error: 'invalid_input' });
  }

  var env = {
    url: process.env.ODOO_URL,
    db: process.env.ODOO_DB,
    uid: Number(process.env.ODOO_UID),
    apiKey: process.env.ODOO_API_KEY
  };
  if (!env.url || !env.db || !env.uid || !env.apiKey) {
    console.error('[lead] variabili d\'ambiente Odoo mancanti o incomplete');
    return res.status(500).json({ ok: false, error: 'server_error' });
  }

  var fullName = (data.nome + ' ' + data.cognome).trim();
  var values = {
    type: 'lead',
    name: 'Lead da landing – ' + fullName,
    contact_name: fullName,
    email_from: data.email,
    phone: data.telefono,
    description: buildDescription(data)
  };

  try {
    var leadId = await odooCreateLead(env, values);
    console.log('[lead] creato crm.lead id', leadId);
    return res.status(201).json({ ok: true });
  } catch (error) {
    /* Il dettaglio resta nei log del server: all'utente non diciamo nulla di tecnico. */
    console.error('[lead] creazione fallita:', error && error.message ? error.message : error);
    return res.status(502).json({ ok: false, error: 'upstream_error' });
  }
};
