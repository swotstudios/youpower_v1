# Brand kit YouPower per Claude Design

Pacchetto pronto da caricare in un progetto **design system** su claude.ai/design.
Ogni file HTML e' un'anteprima autonoma: contiene i token al suo interno, quindi
si apre correttamente anche da sola, con doppio clic.

```
tokens.css                      copia di styles/brand-tokens.css (fonte dei valori)
foundations/colors.html         palette e combinazioni ammesse        card "Brand"
foundations/typography.html     scala tipografica Nunito Sans         card "Type"
foundations/spacing.html        spaziature, raggi, ombre              card "Spacing"
components/buttons.html         primary, sage, su scuro, testuali     card "Components"
components/form-fields.html     input, chip radio, checkbox, errore   card "Forms"
components/cards.html           contenuto, case study, recensione     card "Components"
components/accordion.html       details nativo                        card "Components"
components/icons.html           icone lineari sage                    card "Components"
```

La prima riga di ogni file e' il marcatore letto dal pannello Design System:

```html
<!-- @dsCard group="Components" name="Bottoni" subtitle="..." -->
```

`group` decide la sezione in cui compare la card. Per aggiungere un componente:
copia un file esistente, cambia il marcatore e il contenuto.

## Come portarlo su Claude Design

1. **Con `/design-sync`** (se il comando e' disponibile nel tuo account): apri
   Claude Code in questa cartella e lancia `/design-sync`. Serve un progetto di
   tipo design system e, la prima volta, l'accesso via `/design-login`.
2. **A mano:** crea un progetto design system su claude.ai/design e carica i
   file mantenendo la struttura delle cartelle.

## Fonte dei valori

I valori arrivano da `styles/brand-tokens.css` e dalle regole di
`brandkit_file_YP/BRAND-KIT-YOUPOWER.md`. Se cambia un token, aggiorna prima
quel file, poi ricopia `tokens.css` qui e risincronizza.

## Note sul contrasto

- Deep Teal `#365252` su bianco: 8,4:1 — colore di lettura standard.
- Teal `#507C7C` su bianco: 4,6:1 — titoli e label.
- Sage `#73AA7F` su bianco: 2,6:1 — solo H1 grandi, icone e CTA, mai testo piccolo.
- Bianco su Deep Teal: 8,4:1 — fasce scure.
