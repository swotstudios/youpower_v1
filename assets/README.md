# assets/

## youpower-logo.png  *(presente)*

Logo ufficiale, copiato da `brandkit_file_YP/asset/YouPower_logo.png`.
1920 x 450 px, PNG con alfa, gia' rifilato al contenuto.
Usato nell'header a 44px di altezza (34px sotto i 768px); larghezza automatica.

## hero-fotovoltaico-ticino.jpg  *(richiesto)*

Foto della colonna destra dell'hero. Il markup in `index.html` punta a questo path esatto.

**Criteri (brand kit § 4.7 e § 6.5)**
- abitazione residenziale reale, tetto con pannelli fotovoltaici integrati
- contesto svizzero / ticinese / alpino
- fotografia realistica, luce naturale, architettura pulita
- niente render futuristici, niente persone stock, niente look pubblicitario o industriale

**Specifiche tecniche**
- formato verticale, rapporto ~4:5 (il contenitore ritaglia in `object-fit: cover`)
- dimensioni consigliate: 1000 × 1250 px (2000 × 2500 px per il 2x)
- peso target: < 250 KB
- se vuoi servire anche WebP, reintroduci un `<picture>` in `index.html`
  fornendo **entrambi** i file (il fallback `<source>` non copre un file mancante)

Il contenitore ha `aspect-ratio` fisso: sostituire la foto non produce layout shift.

---

## progettazione-tetto-fotovoltaico.jpg  *(richiesto)*

Immagine della colonna destra della sezione "Ogni impianto nasce da una
progettazione su misura". Il markup punta a questo path esatto; finche' il file
manca, il contenitore resta un pannello bianco con angoli a `--radius-xl` e
`--shadow-card`, quindi il layout regge senza rotture.

**Cosa deve mostrare** — deve leggersi come *progettazione*, non come benefici
generici del fotovoltaico. In ordine di preferenza:

1. rilievo tecnico su un tetto reale (sopralluogo, misurazione della falda);
2. render 3D **del progetto YouPower** con la disposizione dei moduli sulla falda
   (stile pulito, isolato, ombra morbida a terra — brand kit § 4.7);
3. dettaglio ravvicinato di moduli posati su una falda, con la struttura di
   fissaggio visibile.

**Da evitare** (brand kit § 6.5): illustrazioni AI generiche, diagrammi
futuristici, HUD e overlay "tech", persone stock, cantieri industriali.

**Specifiche tecniche**
- verticale ~4:5 su desktop; il contenitore ritaglia in `object-fit: cover`
  e passa a 16:10 sotto i 1024px e a 3:2 sotto i 640px, quindi tenere il
  soggetto centrato e lasciare margine ai bordi
- dimensioni consigliate: 1000 x 1250 px (2000 x 2500 px per il 2x)
- peso target: < 250 KB
- caricata con `loading="lazy"`: sta sotto la piega

**Se si opta per il render 3D**, l'`alt` in `index.html` va aggiornato di
conseguenza: oggi descrive un rilievo tecnico su tetto reale.

---

## Dato mancante, non un file

La voce "Recensioni Google" della trust bar e' oggi solo un'etichetta: non ci
sono in progetto ne' il punteggio medio ne' il numero di recensioni. Quando il
dato sara' disponibile andra' deciso se mostrarlo in chiaro (es. "4,9 su 47
recensioni") — senza stelle grandi ne' badge, per restare nel tono del brand.

---

## Contenuti da validare prima della pubblicazione (sezione Incentivi)

I testi dei quattro accordion sono ricavati **solo** dalle pagine youpower.ch
`/incentivi-fiscali/`, `/faq/` e `/prodotti/impianti-fotovoltaici/`, senza importi
ne' percentuali. Vanno comunque confermati da YouPower, perche' toccano materia
fiscale e regolamentare:

- **Federale — Pronovo** — rimunerazione unica, cumulabile con incentivi
  cantonali e comunali.
- **Cantonale — FER** — Fondo energie rinnovabili per il fotovoltaico in Ticino,
  cumulabile con il contributo federale.
- **Comunale** — incentivi aggiuntivi variabili da comune a comune.
- **Agevolazioni fiscali** — deducibilita' dei costi dal reddito imponibile con
  ripartizione su piu' anni fiscali. Da verificare se vale per l'imposta
  cantonale, per quella federale diretta o per entrambe, e a quali condizioni
  (es. immobile esistente).

Esclusi di proposito: gli importi CHF della pagina incentivi, riferiti alle
termopompe, e le percentuali della pagina FAQ, non validati per questa landing.

---

## Recensioni clienti — fonte e aggiornamento

Le tre recensioni della sezione "Chi ha scelto YouPower" **non sono placeholder**
(ognuna e' abbinata a una promessa diversa, mostrata come titolo della card):
sono recensioni Google reali, mostrate su youpower.ch tramite il widget Trustindex
(homepage e `/prodotti/impianti-fotovoltaici/`, rilevate il 10/09/2026).

| Promessa confermata | Cliente (come pubblicato) | Stelle Google | Estratto usato |
|---|---|---|---|
| Gestione chiavi in mano | Giovanni (GiDA) | 5/5 | due frasi consecutive + "hanno pensato loro a tutto", con omissione `[…]` |
| Precisione e puntualità | Stefano Scossa | 5/5 | seconda e terza frase |
| Assistenza post-vendita | lorenzo giacchetti | 5/5 | prime due frasi |

- Gli estratti sono **letterali**: nessuna parola modificata, solo tagli segnalati.
  Sono stati omessi i nomi dei collaboratori YouPower citati nel testo.
- Unica normalizzazione: "lorenzo giacchetti" e' mostrato con le iniziali
  maiuscole ("Lorenzo Giacchetti").
- Il widget non espone voto medio ne' numero totale di recensioni, quindi la
  landing non li mostra.
- **Da confermare con YouPower** prima della pubblicazione: l'uso dei nomi
  completi dei clienti fuori dal widget Google. In alternativa usare nome e
  iniziale del cognome.

Per sostituire una recensione: copiare un estratto letterale da Google, con
nome e stelle come pubblicati. Non riformulare il testo.

---

## Assistenza post-vendita e FAQ — fonti

- **Assistenza**: controlli periodici, manutenzione, pulizia, supporto tecnico e
  polizze assicurative da `/prodotti/impianti-fotovoltaici/`; "controllo attivo
  della produzione di energia" da `/faq/`.
- **FAQ**: risposte ricavate da `/faq/` (tetti adatti, orientamento, notifica al
  comune, durata 25–30 anni, accumulo, ricarica auto) e da
  `/prodotti/impianti-fotovoltaici/` (progettazione, tipi di tetto).
  **Esclusi di proposito** le percentuali sui contributi presenti in `/faq/`
  (20% federale, circa 40% complessivo, RUE fino al 60%): non validati per questa
  landing.

---

## Form contatti — integrazioni ancora mancanti

Il form della sezione `#contatti` e' in **modalita' demo** (`DEMO_MODE = true`
nello script in fondo a `index.html`, e `data-demo="true"` sul `<form>`):
valida i campi e mostra la conferma, ma **non invia nessun dato**.
**Non pubblicare la landing con il form in demo:** l'utente vedrebbe una
conferma per una richiesta mai ricevuta.

Da collegare prima del go-live:

1. **Destinazione dell'invio** — endpoint del CRM o del gestionale YouPower,
   form service o funzione serverless su Vercel. Il blocco da sostituire e'
   segnato `DEMO` nel listener `submit`.
2. **Notifica interna** — email o CRM verso il team commerciale.
3. **Anti-spam** — honeypot, rate limit lato server o captcha invisibile, a
   seconda del backend scelto.
4. **Tracciamento conversione** — evento su invio riuscito (GA4, Meta, Ads),
   da attivare solo dopo il consenso cookie.
5. **Registrazione del consenso privacy** — data, ora e versione
   dell'informativa accettata, lato backend.

Campi inviati (`name`): `nome`, `cognome`, `email`, `telefono`, `proprieta`
(stessi valori del form di youpower.ch: "Casa Indipendente", "Condominio",
"Azienda/Attività Commerciale"), `consumo` (testo libero, kWh o CHF),
`consumo-non-lo-so` (`1` se selezionato), `privacy` (`1`).

## Footer — fonti

Contatti, sedi, numero CHE e link Privacy e Cookie policy sono presi dal footer
di youpower.ch. Telefono ed email sono testo semplice, non link `tel:`/`mailto:`:
il brief ammette nel footer solo link legali.

---

## Case history "Progetti reali, soluzioni su misura" — immagini richieste

Le tre card mostrano per ora un **placeholder** (fondo mint e icona lineare).
Nel markup ogni `case__media` contiene il commento con l'`<img>` da inserire.

| File da creare | Progetto | Foto di riferimento su youpower.ch |
|---|---|---|
| `assets/case-davesco.jpg` | Davesco — edificio residenziale, RCPv | `/impianti/impianto-fotovoltaico-per-edificio-residenziale-2/` (drone `DJI_20260616092705_0657_D`) |
| `assets/case-viganello.jpg` | Viganello — Condominio Hubertus Galbo, RCPv | `/impianti/impianto-fotovoltaico-per-edificio-residenziale-3/` (drone `DJI_20260618093930_0708_D`) |
| `assets/case-vacallo.jpg` | Vacallo — studio Comal, tetto piano + facciata | `/impianti/impianto-fotovoltaico-per-studio-di-ingegneria-e-architettura/` (drone `DJI_20260615115049_0559_D`) |

**Specifiche**
- orizzontale 16:9 su desktop; sotto i 1024px il riquadro ritaglia a 3:1,
  quindi tenere l'impianto al centro
- almeno 1024 x 576 px, meglio l'originale ad alta risoluzione (le versioni
  sul sito sono gia' ridotte a 1024 px)
- peso target < 200 KB ciascuna, caricate `loading="lazy"`
- per Vacallo scegliere uno scatto in cui si veda anche la **facciata**:
  e' la caratteristica distintiva della card
- dopo l'inserimento, scrivere un `alt` che descriva lo scatto reale

## Case history — fonti dei dati

Tutti i dati delle card sono verificati sulle pagine Referenze di youpower.ch
(settembre 2026): localita', tipologia, anno, potenza, produzione annua stimata,
RCPv e tetto piano + facciata.

Esclusi di proposito i claim presenti su quelle pagine e non verificabili:
"azzera gli sprechi e taglia i costi in bolletta", "drastica riduzione delle spese
condominiali", "riducendo drasticamente l'impatto ambientale".
