# ESSE — Sanity Studio

Studio de gestion de contenu pour le site de l'association ESSE, basé sur **Sanity v4**.

## Lancer en développement

```bash
npm install
npm run dev
```

Le studio est accessible sur [http://localhost:3333](http://localhost:3333).

## Commandes

```bash
npm run dev      # Studio en développement
npm run build    # Build du studio
npm run deploy   # Déployer le studio sur Sanity hosting
```

## Schémas de contenu

| Schéma | Description |
|---|---|
| `siteSettings` | Paramètres globaux (identité, adresses, contacts, réseaux sociaux, horaires) |
| `article` | Articles et actualités |
| `activite` | Activités et cours (planning, structure, tarif, intervenant) |
| `event` | Événements (dates, lien d'inscription, statut) |
| `planning` | Plannings mensuels (image ou vidéo) |
| `teamMember` | Membres de l'équipe (bureau, CA, équipe, bénévoles) |
| `partenaire` | Partenaires de l'association |

## Déploiement

Le studio est hébergé sur Sanity hosting :

```bash
npm run deploy
```

Un webhook est configuré pour déclencher un rebuild Netlify à chaque publication.