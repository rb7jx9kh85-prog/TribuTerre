# assets/ — fichiers

Toute image manquante est remplacée automatiquement par un placeholder cohérent
(monogramme TT pour les bouteilles, paysage stylisé pour les photos) — rien ne casse.

## Présents : bouteilles (WebP transparents, ~30 Ko chacun, hauteur 1300 px)
`TerreRouge.webp` · `TerreN13.webp` · `VieillesVignesGamay.webp` · `TerreDAutomne.webp`
`MerlotPrestige.webp` · `TerreDeRose.webp` · `TerreBlanche.webp` · `LArdoisiere.webp`

## Présents : médias
- `hero-1.mp4` / `hero-2.mp4` — la séquence vidéo du hero (« de la terre au raisin »
  puis « du raisin au vin », puis le logo). `hero-1.mp4` fait ~18 Mo (clip iPhone
  brut) ; le recompresser en H.264 ≤ 1080p / ~3-5 Mo améliorerait beaucoup le chargement.
- `ardevaz.webp` — la vraie paroi de l'Ardevaz (HEIC converti), section terroir + accueil
- `gammes.webp` — la gamme des 8 bouteilles, section « Nos gammes »

## Logo
- `logo.svg` — logomark provisoire (monogramme TT + TRIBUTERRE) utilisé dans
  l'en-tête et à la fin du hero. **Pour le vrai logo : déposer `assets/logo.png`**
  (PNG transparent) — il remplace automatiquement le SVG partout (le code teste
  `logo.png` puis retombe sur `logo.svg`).

## Encore attendus → placeholder automatique
- `logo.png` — le vrai logo officiel (voir ci-dessus)
- `Fendant` + `Orange 2.4` — bouteilles absentes du Drive → carte avec monogramme TT
- `vignes.jpg` — les vignes sous l'Ardevaz (page terroir)
- `cave.jpg` — la cave de Riddes (histoire + contact)
- police du logo (fichier .otf/.ttf) — pour remplacer Cormorant Garamond (var `--font-display`)

En leur absence, les emplacements concernés montrent un paysage stylisé. Aucune
modification de code nécessaire pour activer un fichier déposé sous le bon nom.
