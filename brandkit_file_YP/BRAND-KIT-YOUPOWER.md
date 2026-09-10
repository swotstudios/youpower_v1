# BRAND KIT — YouPower

**Fonte:** analisi del sito ufficiale [youpower.ch](https://www.youpower.ch/) e della pagina prodotto [Impianti Fotovoltaici](https://www.youpower.ch/prodotti/impianti-fotovoltaici/).
**Metodo di estrazione:** valori tipografici, pesi, dimensioni, line-height e colori catturati con l'estensione WhatFont direttamente dal DOM live del sito (screenshot forniti). Tutti i valori marcati come `[OSSERVATO]` sono letti dal codice reale del sito; i valori `[INFERITO]` sono derivati per coerenza dal linguaggio visivo osservato e vanno confermati con ispezione DOM diretta prima di considerarli canonici.
**Uso:** questo file è autosufficiente e può essere passato a Claude Code, Claude Design, altri strumenti AI o designer umani come sistema di riferimento per landing page, creatività ADV e nuove interfacce YouPower.

---

## 1. Tipografia

### 1.1 Font family

**Nunito Sans** — unico font family utilizzato su tutto il sito, per titoli, body, label, CTA e form. `[OSSERVATO]`

```css
font-family: "Nunito Sans", sans-serif;
```

**Nessun font secondario.** Il sito non utilizza un font serif per display, né un mono per label tecniche. L'identità tipografica è mono-family: la personalità viene dai pesi, dai colori e dalla generosità delle line-height, non da contrasti tra famiglie.

### 1.2 Pesi utilizzati `[OSSERVATO]`

| Weight | Uso reale sul sito |
|--------|--------------------|
| 300 (Light) | Lead / sottotitoli sotto le headline; body alternativo |
| 400 (Regular) | Body text standard, testi lunghi |
| 600 (SemiBold) | H2, H3, H4, label di sezione, titolo dei blocchi form |
| 700 (Bold) | Solo H1 hero |

Da caricare via Google Fonts o self-hosted **con i soli quattro pesi**. Non aggiungere Italic, Black o Extra-Light: non fanno parte del sistema.

### 1.3 Scala tipografica

Tutti i valori desktop sono `[OSSERVATO]` da WhatFont. I valori mobile sono `[INFERITO]` con riduzione lineare basata su una gerarchia responsive standard e vanno verificati (probabilmente il sito applica breakpoint intorno ai 768px).

| Ruolo | Font size desktop | Font size mobile (inferito) | Weight | Line-height | Colore |
|-------|-------------------|-----------------------------|--------|-------------|--------|
| H1 (hero) | 60px | ~36–40px | 700 | 60px (1.0) | `#73AA7F` |
| H2 | 32px | ~26px | 600 | 42px (~1.31) | `#507C7C` |
| H3 | 28px | ~24px | 600 | 36px (~1.29) | `#507C7C` |
| H4 (card title) | 20px | ~18px | 600 | 26px (1.30) | `#507C7C` |
| Body Large / Lead | 16px | 16px | 300 | 24px (1.50) | `#507C7C` |
| Body | 16px | 16px | 400 | 24px (1.50) | `#365252` |
| Body Light | 16px | 16px | 300 | 24px (1.50) | `#365252` |
| Small / Label | 14px `[INFERITO]` | 14px | 400 | 20px | `#365252` |
| Button | 16px `[INFERITO]` | 16px | 600 | 1.20 | vedi sez. 5 |

**Note importanti:**
- L'H1 usa `line-height: 60px` uguale al font-size — line-height **1.0** — che è una scelta forte e deliberata. Tenerlo così per mantenere l'identità hero.
- Nessun `letter-spacing` custom rilevato sui titoli `[OSSERVATO]`. Non aggiungere tracking né in ADV né in landing.
- Nessun uso di ALL-CAPS o eyebrow labels tracked-out nel sito principale (l'unica occorrenza in ALL-CAPS è la tagline del logo "THE ENERGY COMPANY", che è parte del logotype, non un pattern di UI).

---

## 2. Palette colori

Palette **estremamente ridotta**: il sito vive di tre soli colori funzionali più il bianco e un wash mint chiarissimo. Non aggiungere colori estranei.

### 2.1 Colori principali `[OSSERVATO]`

#### YouPower Sage (Primary)
- **HEX:** `#73AA7F`
- **RGB:** `rgb(115, 170, 127)`
- **Utilizzo:** H1 hero, freccia del logo, icone lineari, elementi accent, badge, illustrazioni. È il colore-firma di YouPower e sostituisce il "blu solare" tipico del settore.

#### YouPower Teal (Secondary)
- **HEX:** `#507C7C`
- **RGB:** `rgb(80, 124, 124)`
- **Utilizzo:** H2, H3, H4, titoli di sezione, titoli dei form, subtitle sotto l'H1. È il colore delle **gerarchie testuali intermedie**.

#### YouPower Deep Teal (Text)
- **HEX:** `#365252`
- **RGB:** `rgb(54, 82, 82)`
- **Utilizzo:** body text, paragrafi, testi lunghi. È il colore di lettura standard.

### 2.2 Background

#### White (Surface)
- **HEX:** `#FFFFFF`
- **Utilizzo:** background principale delle sezioni content, card, form.

#### YouPower Mint (Ambient Background)
- **HEX:** `#E8F1EC` `[INFERITO]` (stima dallo screenshot hero — da confermare campionando il pixel esatto)
- **Utilizzo:** wash molto tenue dietro l'hero e alcune sezioni con la forma curva decorativa. Non è mai un colore "pieno": è sempre percepito come sfondo ambientale delicato.

### 2.3 Colori di stato `[INFERITO — nessuno visibile negli screenshot]`

Il sito osservato non mostra esplicitamente colori di error / success / warning. Per coerenza con la palette, se necessari in futuri form si suggerisce:

- **Success:** `#73AA7F` (riuso del primary)
- **Error:** `#B85450` (rosso desaturato coerente con la palette calda-fredda del brand — **da approvare**)
- **Info / Neutral:** `#507C7C`

Non introdurre rossi vivi, arancioni o gialli fluo: rompono il tono premium/wellness del brand.

### 2.4 Come combinarli — regole di leggibilità

- **Sage `#73AA7F` su bianco:** OK per H1 grandi (60px), NON per testi piccoli (contrasto insufficiente). Non usarlo mai per body.
- **Teal `#507C7C` su bianco:** OK per H2/H3/H4 e label. Contrasto medio-alto.
- **Deep Teal `#365252` su bianco:** massimo contrasto per body — è il colore di lettura primario.
- **Bianco su Sage o Deep Teal:** OK per CTA e testo su bottoni scuri.
- Non usare **Sage su Mint** né **Teal su Mint**: la leggibilità crolla.

---

## 3. Design tokens

Struttura di token pronti per essere iniettati come CSS variables. Vedere anche il file `styles/brand-tokens.css` allegato.

### 3.1 Color tokens

```css
/* Brand core */
--color-primary: #73AA7F;         /* Sage - accent, hero H1, icone */
--color-primary-dark: #5C8F68;    /* [INFERITO] hover / pressed state */
--color-secondary: #507C7C;       /* Teal - headings intermedie */
--color-text: #365252;            /* Deep Teal - body */
--color-text-muted: #507C7C;      /* uguale a secondary, per lead */

/* Surfaces */
--color-background: #FFFFFF;      /* superficie principale */
--color-surface: #FFFFFF;         /* card e blocchi contenuto */
--color-surface-alt: #E8F1EC;     /* [INFERITO] mint wash per hero */

/* Utility */
--color-border: #E0E7E3;          /* [INFERITO] bordi form / divisori */
--color-border-strong: #507C7C;   /* [INFERITO] focus / attivo */

/* On-color (testo su fondo colorato) */
--color-on-primary: #FFFFFF;
--color-on-dark: #FFFFFF;
```

### 3.2 Radius tokens `[INFERITO dalle forme visibili negli screenshot]`

Il sito è caratterizzato da un livello di arrotondamento **molto alto**. Bottoni e input sono pill (border-radius pieno); le card sono nettamente più arrotondate della media (~24–32px).

```css
--radius-sm: 8px;      /* small chip, tag */
--radius-md: 16px;     /* input secondari, small card */
--radius-lg: 24px;     /* card contenuto */
--radius-xl: 32px;     /* card grandi (es. form panel) */
--radius-pill: 999px;  /* bottoni CTA e input di form */
```

### 3.3 Spacing tokens `[INFERITO — scala coerente con densità del sito]`

Il sito ha una densità **molto bassa** con abbondante white space. Si propone una scala 4-based classica:

```css
--space-xxs: 4px;
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 40px;
--space-xl: 64px;
--space-2xl: 96px;   /* padding verticale tra macro-sezioni */
--space-3xl: 128px;  /* separazione hero / prima sezione */
```

### 3.4 Layout tokens `[INFERITO]`

```css
--container-width: 1200px;      /* max-width contenuto */
--container-padding: 24px;      /* padding orizzontale mobile */
--content-narrow: 720px;        /* body text a colonna singola */
```

### 3.5 Shadow tokens `[INFERITO]`

Il sito usa ombre **molto morbide e diffuse**, non le classiche dark drop-shadow. Sotto la card form l'ombra è ampia e a bassa opacità.

```css
--shadow-soft: 0 8px 24px rgba(54, 82, 82, 0.08);
--shadow-card: 0 16px 48px rgba(54, 82, 82, 0.10);
--shadow-elevated: 0 24px 64px rgba(54, 82, 82, 0.12);
```

### 3.6 Typography tokens

```css
--font-family-base: "Nunito Sans", system-ui, -apple-system, sans-serif;

--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Font sizes desktop */
--font-size-h1: 60px;
--font-size-h2: 32px;
--font-size-h3: 28px;
--font-size-h4: 20px;
--font-size-body: 16px;
--font-size-small: 14px;

/* Line heights */
--line-height-tight: 1.0;    /* H1 */
--line-height-heading: 1.3;  /* H2/H3/H4 */
--line-height-body: 1.5;     /* body */
```

---

## 4. Componenti UI — stile osservato

### 4.1 Bottoni

Due varianti principali visibili:

**Primary CTA (es. "Configura il tuo impianto")**
- Forma: pill (`border-radius: 999px`)
- Background: teal scuro (probabilmente `#365252` o leggermente più scuro `[INFERITO]`)
- Testo: bianco, weight 600
- Padding: generoso, ~14–16px verticali × 28–32px orizzontali `[INFERITO]`
- Nessun bordo, nessun'ombra visibile evidente

**Secondary / Form submit (es. "Invia le informazioni")**
- Forma: pill
- Background: verde sage tenue / mint `[INFERITO]` (appare più chiaro del primary, possibile stato disabilitato oppure variante secondaria)
- Testo: bianco o teal scuro a seconda dello stato

**Non presenti nel sito:** bottoni squadrati, bottoni outline con bordo hairline, bottoni con freccia "→" nel testo, bottoni ghost.

### 4.2 Card

- Border-radius: 24–32px (molto ampio)
- Background: bianco
- Ombra: `--shadow-card`, molto diffusa e morbida
- Padding interno: abbondante (~32–48px)
- Nessun bordo visibile, l'elevazione è data solo dall'ombra

### 4.3 Form fields

- Forma: pill (`border-radius: 999px`)
- Background: bianco
- Bordo: hairline chiaro `[INFERITO]`
- Placeholder in teal chiaro
- Padding orizzontale ampio (~24px)
- Radio button: circolari classici, colore active `#73AA7F` sage `[INFERITO]`

### 4.4 Icone

- Stile: **line icons**, tratto sottile, non filled
- Colore: sage `#73AA7F`
- Dimensione: grandi nei blocchi feature (~64–80px `[INFERITO]`)
- **Non usare:** icone piene colorate, icone con background circolare, icone stile "Material Filled". Il linguaggio è lineare e minimale.

### 4.5 Header

- Layout: logo a sinistra, menu orizzontale centrale/destro, CTA pill scura all'estrema destra
- Background: trasparente sopra il wash mint, o bianco quando si scrolla `[INFERITO]`
- Nessuna ombra sotto l'header
- Link menu: teal scuro, weight regolare, hover in sage `[INFERITO]`

### 4.6 Footer

`[OSSERVATO da fetch testuale]` Contiene: contatti sede legale + operativa, membership Swiss Solar, social icons, link legali. Da ispezionare visualmente per estrarre lo stile esatto — non presente negli screenshot forniti.

### 4.7 Illustrazioni e forme decorative

- **Grande forma curva verde/mint** in hero sul lato sinistro: elemento identitario forte, probabilmente SVG (`decoration-left.svg` come confermato dai path del tema `youpower26`).
- Illustrazioni 3D fotorealistiche di case con pannelli (es. render nella sezione RCP): stile pulito, sfondo bianco, ombra morbida a terra.
- Fotografie: architettura residenziale svizzera realistica, pannelli integrati, luce naturale, mai stock generico.

---

## 5. Sintesi stile visivo

**Percezione generale:** **premium, calmo, naturale, lifestyle-adjacent.** YouPower **non** si presenta come un player tech B2B del solare (blu-elettrico, giallo-sole, look industriale), ma come un brand **quasi wellness**: verde salvia, teal profondo, forme organiche, molto respiro. Questa è la differenza competitiva più forte del sito ed è la cosa da **preservare** nelle nuove landing e nelle creatività ADV.

**Assi caratteristici:**

- **Formalità:** medio-alta, corporate ma calda. Non istituzionale-freddo, non startup-scanzonato.
- **White space:** abbondantissimo. Le sezioni respirano, il contenuto è centrato e mai denso.
- **Densità:** bassa. Poco testo per schermata, headline grandi, molte icone, ampi margini.
- **Rapporto testo/immagine:** bilanciato, con forte presenza di fotografia e illustrazione 3D fotorealistica.
- **Uso del colore:** parsimonioso. Il sage `#73AA7F` è usato **solo** per l'H1, il logo accent, le icone e i piccoli dettagli. Non colora mai grandi superfici.
- **Trattamento background:** wash molto tenui di mint dietro l'hero e alcune sezioni. Nessun colore pieno saturo su grandi aree.
- **Gradienti:** **quasi assenti.** Le CTA scure potrebbero avere un gradiente tono-su-tono molto sottile — non un gradiente vistoso multicolor.
- **Icone:** linea sottile, monocromatiche sage. Sempre lo stesso stile.
- **Arrotondamento:** **molto alto.** Bottoni e input pill, card ampiamente arrotondate. È una cifra visiva forte.
- **Contrasto:** medio-basso e caldo. La palette teal + sage + mint produce una gamma armonica, non ad alto contrasto.
- **Fotografia:** residenziale svizzera realistica, cieli chiari, case con pannelli, mai imprese industriali cupe, mai render generici da stock library.

**In una parola:** *sereno.* Il sito trasmette la sensazione che passare al fotovoltaico con YouPower sia una scelta **naturale, ordinata e senza attrito**, non una decisione tecnica complicata.

---

## 6. Brand guardrails — regole da NON violare

Regole vincolanti per chiunque produca landing page, creatività, ADV o documenti per YouPower.

### 6.1 Colore
- ❌ **Mai** introdurre blu corporate (`#0057B7`, `#0066CC`, ecc.) "perché è il colore del solare". YouPower ha scelto deliberatamente di **non** usarlo.
- ❌ Mai giallo/arancio saturi da "energy". Rompono il tono premium.
- ❌ Mai gradienti multicolor stile SaaS (viola→rosa, blu→teal→verde).
- ✅ Usare `#73AA7F` con **parsimonia**, solo su elementi importanti (H1, icone chiave, CTA accent, badge).
- ✅ La grande maggioranza delle superfici deve restare bianca o mint tenuissimo.

### 6.2 Tipografia
- ❌ Mai sostituire Nunito Sans con Inter, Poppins, Montserrat o "un font simile".
- ❌ Mai usare pesi diversi da 300 / 400 / 600 / 700.
- ❌ Mai ALL-CAPS tracked-out come eyebrow label sopra i titoli.
- ❌ Mai accentare una parola singola in un titolo con colore o italic diverso.
- ✅ H1 sempre con line-height 1.0 e in sage.
- ✅ Body sempre in `#365252`.

### 6.3 Forma
- ❌ Mai card squadrate o con radius piccolo (4–8px) per elementi principali.
- ❌ Mai bottoni squadrati o "rounded 8px". I bottoni YouPower sono **pill**.
- ❌ Mai ombre dure nere. Le ombre sono sempre in tinta teal-tenue.
- ✅ Ampio border-radius su card e input.

### 6.4 Layout
- ❌ Mai layout densi da "SaaS dashboard" con tante card fitte.
- ❌ Mai griglie a 3–4 colonne con contenuti pieni fino ai bordi.
- ❌ Mai landing "long-form startup" con sezione dopo sezione senza respiro.
- ✅ Massimo white space, sezioni ariose, focus su una cosa alla volta.

### 6.5 Tono visivo
- ❌ Mai look tech-B2B, mai look industriale (fabbriche, cantieri, tute da lavoro).
- ❌ Mai look promozionale ("SCONTO 30%", "OFFERTA LIMITATA" con badge rossi).
- ❌ Mai stock photography generica di famiglie sorridenti davanti a pannelli.
- ✅ Fotografia architettonica realistica di edifici residenziali svizzeri.
- ✅ Se si usano render 3D, devono essere puliti, isolati, con ombra morbida (stile visto nel sito).

### 6.6 Icone e illustrazioni
- ❌ Mai icone piene colorate o icone con background circolare.
- ❌ Mai emoji.
- ✅ Solo line icons sage, tratto sottile.
- ✅ Se serve un elemento decorativo grafico, usare curve organiche (come la forma nell'hero), non pattern geometrici duri.

---

## 7. Assets di riferimento

- **Logo:** `https://www.youpower.ch/youpower/wp-content/themes/youpower26/img/YouPower_logo.png`
- **Elemento decorativo hero:** `https://www.youpower.ch/youpower/wp-content/themes/youpower26/img/decoration-left.svg`
- **Icone feature (Google Material style):** presenti in `/wp-content/uploads/2024/03/` (energy.png, savings-1.png, blanket.png, real_estate_agent.png, payments.png, monetization_on.png, account_tree.png, home_work.png, electrical_services.png, wifi.png, page.png, recycling.png)
- **Badge membership:** Swiss Solar → `/wp-content/themes/youpower26/img/swiss_solar.png`

---

## 8. Cosa non è stato possibile estrarre e come completarlo

Per portare a certezza 100% i valori marcati `[INFERITO]`, servono queste verifiche rapide da DevTools sul sito live:

1. **Colore esatto del wash mint dell'hero** — campionare col color picker un pixel neutro del background dietro il titolo H1.
2. **Background esatto del bottone "Configura il tuo impianto"** — computed style `background-color` dell'elemento CTA.
3. **Border-radius reale di card e bottoni** — computed style `border-radius`.
4. **Ombre esatte** — computed style `box-shadow` di card e form panel.
5. **Container `max-width`** — computed style `max-width` del wrapper principale.
6. **Font sizes mobile** — ispezionare in DevTools mode responsive a 375px per confermare o correggere i valori mobile inferiti.
7. **Bordi degli input form** — computed style `border` degli input.
8. **Padding interni dei bottoni** — computed style `padding` della CTA scura.

Una volta ottenuti questi valori, aggiornare direttamente `styles/brand-tokens.css` sostituendo i placeholder marcati `[INFERITO]` con i valori reali, e rimuovere il tag da questo documento.

---

*Documento generato il 09/09/2026. Versione 1.0.*
