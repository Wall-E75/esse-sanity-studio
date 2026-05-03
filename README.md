# ESSE — Sanity Studio

Studio de gestion de contenu pour le site de l'association ESSE, basé sur **Sanity v4**.

Studio en ligne : **[esse-admin.sanity.studio](https://esse-admin.sanity.studio)**

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

## Variables d'environnement

Créer un fichier `.env` à la racine de `sanity-studio/` :

```env
SANITY_STUDIO_PROJECT_ID=b1t2bis9
SANITY_STUDIO_DATASET=production
```

## Schémas de contenu

| Schéma | Description |
|---|---|
| `siteSettings` | Singleton — identité, adresses, contacts, réseaux sociaux, horaires |
| `article` | Articles et actualités avec contenu riche (Portable Text) |
| `activite` | Activités et cours (structure, horaires, tarif, intervenant) |
| `event` | Événements ponctuels (dates, lieu, lien d'inscription, statut) |
| `planning` | Plannings mensuels (image ou vidéo) |
| `teamMember` | Membres de l'équipe groupés par rôle (bureau, CA, équipe, bénévoles) |
| `partenaire` | Partenaires et soutiens de l'association |

## Gestion des accès

Pour inviter un membre de l'équipe au studio :
- [sanity.io/manage](https://sanity.io/manage) → projet `b1t2bis9` → **Members** → **Invite**
- Rôle recommandé pour l'équipe : **Editor**

## Déploiement

Le studio est hébergé sur Sanity hosting :

```bash
npm run deploy
```

## Mise à jour du site

Le site frontend utilise l'ISR (revalidation toutes les 60 secondes) — les publications apparaissent sur le site en moins d'une minute, sans déclencher de rebuild.