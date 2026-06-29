# Tributerre

Site vitrine de la cave **Tributerre** — Christian Vouillamoz, vigneron-encaveur
à Leytron / Riddes, Valais. Les vignes poussent sous la paroi calcaire de
l'Ardevaz ; la cave et l'élevage sont à Riddes, dans un bâtiment de 1908. Entre
les deux, trois générations.

## Stack

HTML / CSS / JS **vanilla**, un seul fichier autosuffisant : `index.html`.
Aucune étape de build, aucun framework.

- [Lenis](https://github.com/darkroomengineering/lenis) `1.1.14` — smooth scroll (CDN)
- [GSAP](https://gsap.com/) `3.12.5` + ScrollTrigger + SplitText (CDN)
- Google Fonts : **Fraunces** (display) + **Work Sans** (texte)

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement

Compatible Vercel en drag-and-drop (site statique, racine = ce dossier).
Aucune configuration nécessaire.

## Structure

```
tributerre/
├── index.html      ← site complet (styles + scripts inline)
├── assets/         ← images (voir assets/README.md)
└── README.md
```

## Assets

Les images réelles ne sont pas encore toutes fournies. Le site **dégrade
proprement** : chaque image manquante est remplacée par un placeholder cohérent
(monogramme TT dans la couleur de la famille, ou paysage stylisé pour
l'Ardevaz). Déposez les fichiers dans `assets/` avec les noms attendus —
voir `assets/README.md` — pour activer les vrais visuels.

## Sections

1. **Hero** — Ardevaz en parallax, accroche révélée caractère par caractère
2. **La famille** — Christian Vouillamoz, trois générations, révélations clip-path
3. **Le terroir** — l'Ardevaz, biodynamie, vendanges à la main
4. **Les cuvées** — scroll horizontal *pinned* (desktop) / grille (mobile)
5. **La cave** — Riddes 1908, grain argentique animé, filigrane TT
6. **Contact** — vente directe, bouton magnétique

## Accessibilité & performance

- `prefers-reduced-motion: reduce` → animations désactivées, contenu statique lisible
- Curseur custom masqué sur écrans tactiles (`pointer: coarse`)
- Grain animé plafonné à 24 fps et stoppé hors écran
- Le site reste lisible même si les CDN ou les images ne chargent pas
