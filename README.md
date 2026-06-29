# Tributerre

Site vitrine de la cave **Tributerre** — Christian Vouillamoz, vigneron-encaveur
à Leytron / Riddes, Valais. Les vignes sous la paroi calcaire de l'Ardevaz ; la
cave et l'élevage à Riddes (1908 Valais). Christian est le premier de la famille
(Paul → Roger → Christian) à vinifier lui-même la plus grande part de la récolte.

## Stack

Site **multi-pages**, HTML / CSS / JS **vanilla**, sans build, sans framework.

- `index.html` · `histoire.html` · `terroir.html` · `cuvees.html` · `contact.html`
- `css/style.css` — styles partagés
- `js/main.js` — comportements partagés (loader, reveals, parallax, light-card, nav, curseur…)
- [Lenis](https://github.com/darkroomengineering/lenis) en CDN — smooth scroll **optionnel** (le site fonctionne sans)
- Google Fonts : **Cormorant Garamond** (titres) + **Work Sans** (texte)

> Police : « Cormorant Garamond » est un substitut proche en attendant la vraie
> police du logo. Pour la remplacer : ajouter un `@font-face` et changer la
> variable `--font-display` dans `css/style.css` (un seul endroit).

## Animations (toutes en vanilla, IntersectionObserver / rAF)

- Faux **écran de chargement** (logo + barre + compteur), rapide après la 1re visite (sessionStorage)
- Intro hero : kicker → lignes en italique (rideau) → grand wordmark TRIBUTERRE
- `.reveal` (blur-up + translate), `.word-reveal` (mot à mot), `.line-reveal` (trait)
- Parallax au scroll sur les images encadrées
- Cartes cuvées : halo qui suit la souris (light-card), lift au survol
- Header collant (`.scrolled`), menu mobile plein écran, curseur custom, marquee, bouton « vin »
- Texture : grain pellicule + grain papier (profondeur), vignettes

Tout est désactivé proprement avec `prefers-reduced-motion: reduce`.

## Lancer en local

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Déploiement

Statique — compatible Vercel en drag-and-drop, racine = ce dossier.

## Assets

Voir `assets/README.md`. Toute image manquante est remplacée par un placeholder
cohérent (monogramme TT / paysage stylisé) ; rien ne casse. Le hero est **prêt
pour une vidéo** : déposez `assets/hero.mp4` et elle s'affiche automatiquement.
