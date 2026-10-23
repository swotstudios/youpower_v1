/**
 * POST /api/lead — crea un'opportunita' nel CRM di Odoo dal form della landing.
 *
 * Le credenziali arrivano solo da variabili d'ambiente e restano sul server:
 * ODOO_URL, ODOO_DB, ODOO_UID, ODOO_API_KEY (vedi .env.example).
 *
 * Odoo di YouPower e' alla versione 18.0 (verificata su
 * /web/webclient/version_info), quindi si usa JSON-RPC: service "object",
 * metodo execute_kw, modello crm.lead, metodo create.
 *
 * Oltre all'opportunita' viene inviata una notifica a info@youpower.ch. La
 * mail parte dallo stesso Odoo (modello mail.mail, create + send), quindi usa
 * il server di posta in uscita gia' configurato li': nessuna credenziale in
 * piu' e nessun servizio esterno. Se l'invio fallisce, il lead resta comunque
 * salvato e l'utente vede la conferma; l'errore finisce solo nei log.
 *
 * Il record nasce con type = "opportunity" (entra subito nella pipeline, prima
 * fase "Nuova") e user_id = false, cioe' non assegnato: senza quel false Odoo
 * lo assegnerebbe all'utente dell'API key.
 * Dalla 19 in poi servirebbe invece la JSON-2 API
 * (POST /json/2/crm.lead/create con header Authorization: bearer <API_KEY>).
 */

/* La function di Vercel ha un tetto di 10s: il budget sta sotto, e viene
   diviso fra la creazione del lead e l'invio della mail. */
var BUDGET_MS = 9000;
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var MAIL_TO = process.env.LEAD_MAIL_TO || 'info@youpower.ch';
var MAIL_FROM = process.env.LEAD_MAIL_FROM || 'YouPower <noreply@youpower.ch>';
var MAIL_SUBJECT = 'YouPower "Richiesta dal form della landing fotovoltaico"';

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
    ['utm_campaign', data.utm_campaign],
    ['utm_term', data.utm_term],
    ['utm_content', data.utm_content],
    ['gclid', data.gclid],
    ['fbclid', data.fbclid],
    ['msclkid', data.msclkid],
    ['referrer', data.referrer]
  ].filter(function (row) { return row[1]; });

  var lines = rows
    .filter(function (row) { return row[1]; })
    .map(function (row) { return escapeHtml(row[0]) + ': ' + escapeHtml(row[1]); });

  if (utm.length) {
    lines.push('');
    lines.push('Provenienza');
    utm.forEach(function (row) { lines.push(escapeHtml(row[0]) + ': ' + escapeHtml(row[1])); });
  }

  return '<p>' + lines.join('<br>') + '</p>';
}

/* Stesso impianto della mail che YouPower gia' riceve dal form del sito:
   dati del contatto, poi provenienza del traffico, poi i click ID. I campi
   vuoti restano "(not set)" invece di sparire, cosi' il formato e' sempre
   lo stesso e si legge a colpo d'occhio cosa manca. */
function buildMailHtml(data, leadId) {
  function val(v) { return v ? escapeHtml(v) : '(not set)'; }

  var contatto = [
    ['Da', data.email],
    ['Nome', data.nome],
    ['Cognome', data.cognome],
    ['Telefono', data.telefono],
    ['Tipo di proprieta\u0300', data.proprieta],
    ['Consumo energetico annuale', data.consumoNonSoDichiarato ? 'Non lo so (dichiarato dal contatto)' : data.consumo],
    ['Accettazione privacy', 'Accettato: Ho letto e accetto l\u2019informativa sulla privacy']
  ];
  var traffico = [
    ['Sorgente', data.utm_source],
    ['Medium', data.utm_medium],
    ['Campagna', data.utm_campaign],
    ['Parola chiave', data.utm_term],
    ['Contenuto', data.utm_content],
    ['Referrer', data.referrer],
    ['Landing Page', data.pageUrl]
  ];
  var click = [
    ['Google Click ID', data.gclid],
    ['Facebook Click ID', data.fbclid],
    ['Microsoft Click ID', data.msclkid]
  ];

  function blocco(righe) {
    return righe.map(function (r) {
      return '<strong>' + escapeHtml(r[0]) + ':</strong> ' + val(r[1]);
    }).join('<br>');
  }

  var crm = leadId
    ? 'Opportunita\u0300 creata nel CRM con id ' + escapeHtml(String(leadId)) + '.'
    : '<strong>Attenzione: la creazione nel CRM non e\u0300 riuscita.</strong> '
      + 'Questo contatto va inserito a mano in Odoo.';

  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5">'
    + blocco(contatto)
    + '<br><br>--- PROVENIENZA TRAFFICO ---<br>' + blocco(traffico)
    + '<br><br>--- CLICK IDs (Google Ads / Facebook Ads) ---<br>' + blocco(click)
    + '<br><br>' + crm
    + '</div>';
}

async function odooRpc(env, model, method, args, timeoutMs, kwargs) {
  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, timeoutMs);

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
          args: [env.db, env.uid, env.apiKey, model, method, args],
          kwargs: kwargs || {}
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
    utm_campaign: str(body.utm_campaign).slice(0, 120),
    utm_term: str(body.utm_term).slice(0, 120),
    utm_content: str(body.utm_content).slice(0, 120),
    gclid: str(body.gclid).slice(0, 200),
    fbclid: str(body.fbclid).slice(0, 200),
    msclkid: str(body.msclkid).slice(0, 200),
    referrer: str(body.referrer).slice(0, 300)
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
    type: 'opportunity',
    user_id: false,
    name: 'Lead da landing – ' + fullName,
    contact_name: fullName,
    email_from: data.email,
    phone: data.telefono,
    description: buildDescription(data)
  };

  var scadenza = Date.now() + BUDGET_MS;
  function restante(max) {
    return Math.max(1000, Math.min(max, scadenza - Date.now()));
  }

  /* Due canali indipendenti: il CRM e la notifica a YouPower. Basta che uno
     dei due riesca perche' il contatto non vada perso, quindi il fallimento
     di uno non annulla l'altro ne' l'esito mostrato all'utente. */
  var leadId = null;
  try {
    leadId = await odooRpc(env, 'crm.lead', 'create', [values], restante(6000));
    console.log('[lead] creata opportunita\' crm.lead id', leadId);
  } catch (error) {
    console.error('[lead] creazione in CRM fallita:', error && error.message ? error.message : error);
  }

  var mailOk = false;
  var viaChatter = false;
  if (process.env.RESEND_API_KEY) {
    try {
      var controller = new AbortController();
      var timer = setTimeout(function () { controller.abort(); }, restante(4000));
      try {
        var r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: MAIL_FROM,
            to: [MAIL_TO],
            reply_to: data.email,
            subject: MAIL_SUBJECT,
            html: buildMailHtml(data, leadId)
          })
        });
        var esito = await r.json();
        if (!r.ok) {
          throw new Error('Resend HTTP ' + r.status + ': ' + (esito && esito.message ? esito.message : ''));
        }
        mailOk = true;
        console.log('[lead] notifica inviata via Resend, id', esito && esito.id);
      } finally {
        clearTimeout(timer);
      }
    } catch (error) {
      console.error('[lead] invio via Resend fallito:', error && error.message ? error.message : error);
    }
  } else {
    console.warn('[lead] RESEND_API_KEY non impostata: si passa al chatter di Odoo');
  }

  /* Ripiego: se l'utente dell'API non puo' creare messaggi in uscita (mail.mail
     e' riservato al gruppo Impostazioni), si passa dal chatter del lead. E' la
     via che un utente CRM ha sempre: Odoo notifica via mail i destinatari
     indicati e il messaggio resta allegato all'opportunita'. Il testo e' lo
     stesso, ma arriva dentro il modello di notifica di Odoo. */
  if (!mailOk && leadId) {
    try {
      var partner = await odooRpc(env, 'res.partner', 'search_read',
        [[['email', 'ilike', MAIL_TO]], ['id']], restante(2500), { limit: 1 });
      if (!partner || !partner.length) {
        console.error('[lead] ripiego impossibile: nessun contatto in Odoo con email', MAIL_TO);
      } else {
        await odooRpc(env, 'crm.lead', 'message_post', [[leadId]], restante(3000), {
          body: buildMailHtml(data, leadId),
          subject: MAIL_SUBJECT,
          message_type: 'comment',
          subtype_xmlid: 'mail.mt_comment',
          partner_ids: [partner[0].id]
        });
        mailOk = true;
        viaChatter = true;
        console.log('[lead] notifica inviata dal chatter del lead', leadId, 'a', MAIL_TO);
      }
    } catch (error2) {
      console.error('[lead] anche il ripiego dal chatter e\' fallito:', error2 && error2.message ? error2.message : error2);
    }
  }

  if (leadId || mailOk) {
    if (!leadId) { console.warn('[lead] contatto salvato solo via mail: va inserito a mano in Odoo'); }
    if (viaChatter) { console.warn('[lead] notifica partita dal chatter: per il formato pulito servono i permessi su mail.mail'); }
    return res.status(201).json({ ok: true });
  }

  /* Il dettaglio resta nei log del server: all'utente non diciamo nulla di tecnico. */
  console.error('[lead] nessun canale riuscito: contatto perso');
  return res.status(502).json({ ok: false, error: 'upstream_error' });
};
