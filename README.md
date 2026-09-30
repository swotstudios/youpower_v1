# Landing YouPower — impianti fotovoltaici in Ticino

Sito statico (`index.html`, nessuna build) piu' una serverless function che invia
le lead al CRM di Odoo.

```
index.html            landing completa (CSS e JS inline)
api/lead.js           POST /api/lead -> crea crm.lead in Odoo
styles/brand-tokens.css   token del brand (copia di riferimento)
assets/               immagini e note sui contenuti
.env.example          nomi delle variabili d'ambiente (senza valori)
```

## Variabili d'ambiente

| Variabile | Valore | Note |
|---|---|---|
| `ODOO_URL` | `https://odoo.youpower.ch` | senza slash finale |
| `ODOO_DB` | `youpower` | |
| `ODOO_UID` | `21` | id dell'utente Odoo |
| `ODOO_API_KEY` | *(segreta)* | API key dell'utente, mai nel repository |

`.env` e' in `.gitignore`: in locale copia `.env.example` in `.env` e inserisci la
chiave. In produzione le variabili si impostano nel pannello dell'hosting.

## Sviluppo locale

La funzione in `api/` gira solo con un runtime serverless: con un semplice
`python3 -m http.server` la pagina si vede ma `/api/lead` risponde 404.

```bash
npm i -g vercel     # una volta sola
vercel dev          # serve la landing e la function su http://localhost:3000
```

## Come arriva una lead in Odoo (CRM -> Pipeline, colonna "Nuova")

1. Il form (due passi, dentro la hero) invia un JSON a `/api/lead`.
2. La function valida i dati, scarta le richieste con honeypot compilato e
   chiama Odoo via JSON-RPC (`/jsonrpc`, `execute_kw`, `crm.lead`, `create`).
   Odoo e' alla 18.0: dalla 19 servirebbe invece la JSON-2 API.
3. Campi creati: `name` ("Lead da landing – Nome Cognome"), `contact_name`,
   `email_from`, `phone`, `description` (tipo di proprieta', consumo, pagina di
   origine e UTM), `type: opportunity` e `user_id: false`.
4. In Odoo le trovi in **CRM -> Pipeline, colonna "Nuova"**: il record entra
   subito nella pipeline e resta **non assegnato**, pronto per essere preso in
   carico da un commerciale.

Errori di Odoo: registrati nei log del server; l'utente vede solo un messaggio
generico con l'indirizzo email di contatto.

## Tracking (GA4, Google Ads, Meta)

Hard-coded in `index.html`, senza Google Tag Manager (non aggiungerlo: duplicherebbe i dati).

- **GA4** `G-4G70N7KYDF`, stessa property di youpower.ch. A invio riuscito del form parte
  `generate_lead` con `form_id = landing_fotovoltaico_ticino`.
- **Google Ads**: nessun tag diretto, la conversione arriva dall'import di `generate_lead` da GA4.
- **Meta Pixel** `860950295860981`: `PageView` e `Lead` (con `eventID`), caricato solo con consenso marketing.
- **Consenso**: banner proprio (cookie `lp_consent`, 180 giorni) con Consent Mode v2, default
  tutto negato come Complianz sul sito principale. Riapribile da "Preferenze cookie" nel footer.
