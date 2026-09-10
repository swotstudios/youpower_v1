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

I testi dei tre accordion sono ricavati **solo** dalle pagine youpower.ch
`/incentivi-fiscali/` e `/prodotti/impianti-fotovoltaici/`, senza importi ne'
percentuali. Vanno comunque confermati da YouPower, perche' toccano materia
fiscale e regolamentare:

- **Federali** — Pronovo e la rimunerazione unica, cumulabile con incentivi
  cantonali e comunali.
- **Cantonali** — Fondo energie rinnovabili (FER) per il fotovoltaico in Ticino;
  deducibilita' dei costi dal reddito imponibile con ripartizione su piu' anni
  fiscali. Da verificare se la deduzione va presentata come cantonale o se
  riguarda anche l'imposta federale diretta.
- **Comunali** — incentivi aggiuntivi variabili da comune a comune.

Esclusi di proposito: gli importi CHF presenti sulla pagina incentivi, perche'
riferiti alle termopompe e non al fotovoltaico, e comunque non validati per
questa landing.
