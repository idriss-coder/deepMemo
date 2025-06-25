# DeepMemo - Application de mémorisation de versets bibliques

## Fonctionnalités

- **Mode Utilisateur** : Les utilisateurs peuvent créer et gérer leurs propres versets
- **Mode Admin** : Les administrateurs peuvent créer des catégories et y ajouter des versets
- **Interface moderne** : Design sombre avec composants shadcn/ui
- **Gestion des versets** : CRUD complet avec sélection de livres, chapitres et versets
- **React Query** : Gestion d'état moderne avec cache et synchronisation automatique

## Architecture des Versets

### Modèle de données

Les versets peuvent être associés de deux manières :
- **Par utilisateur** (`user_id`) : Pour les versets créés par les utilisateurs
- **Par catégorie** (`category_id`) : Pour les versets créés par les admins

### API Versets

#### Création d'un verset

```typescript
// Pour un utilisateur
POST /api/verses
{
  "book_num": 1,
  "chapter_num": 1,
  "verses_num": [1, 2, 3],
  "content": "Au commencement...",
  "user_id": "user_id_here"
}

// Pour un admin (catégorie)
POST /api/verses
{
  "book_num": 1,
  "chapter_num": 1,
  "verses_num": [1, 2, 3],
  "content": "Au commencement...",
  "category_id": "category_id_here"
}
```

#### Récupération des versets

```typescript
// Versets d'un utilisateur
GET /api/verses?user_id=user_id_here

// Versets d'une catégorie
GET /api/verses?category_id=category_id_here
```

#### Mise à jour d'un verset

```typescript
PUT /api/verses/[local_id]
{
  "content": "Nouveau contenu du verset"
}
```

#### Suppression d'un verset

```typescript
DELETE /api/verses/[local_id]
```

### Hooks React Query

#### useVerses - Récupération des versets

```typescript
// Pour les versets d'un utilisateur
const { verses, loading, error, createVerset } = useVerses(userId);

// Pour les versets d'une catégorie
const { verses, loading, error, createVerset } = useVerses(undefined, categoryId);

// Pour les versets sans filtre (retourne une erreur)
const { verses, loading, error, createVerset } = useVerses();
```

#### useVersetMutations - Opérations CRUD

```typescript
const {
  createVerset,
  updateVerset,
  deleteVerset,
  isCreating,
  isUpdating,
  isDeleting
} = useVersetMutations();

// Créer un verset
await createVerset({
  user_id: "user_id",
  book_num: 1,
  chapter_num: 1,
  verses_num: [1, 2, 3],
  content: "Contenu du verset"
});

// Mettre à jour un verset
await updateVerset({
  localId: 123,
  content: "Nouveau contenu"
});

// Supprimer un verset
await deleteVerset(123);
```

### Dashboard Admin

Le dashboard admin permet de :
- Créer, modifier et supprimer des catégories
- Ajouter des versets directement aux catégories
- Visualiser les statistiques

Les versets créés via le dashboard sont automatiquement associés à la catégorie sélectionnée.

## Installation

```bash
npm install
npm run dev
```

## Structure du projet

```
src/
├── app/
│   ├── admin/dashboard/     # Dashboard admin
│   ├── api/                 # Routes API
│   └── plaground/          # Interface utilisateur
├── components/             # Composants UI
├── hooks/                  # Hooks personnalisés (React Query)
├── models/                 # Modèles MongoDB
└── service/               # Services métier
```

## Migration de VersetService vers React Query

Le projet a été migré de l'utilisation du `VersetService` vers des hooks React Query pour une meilleure gestion d'état :

### Avantages de React Query :
- **Cache automatique** : Les données sont mises en cache et synchronisées
- **Gestion d'état optimiste** : Interface réactive pendant les opérations
- **Gestion d'erreur centralisée** : Gestion cohérente des erreurs
- **Invalidation automatique** : Mise à jour automatique des données après mutations
- **Loading states** : États de chargement intégrés

### Exemple de migration :

```typescript
// Avant (VersetService)
const versetService = new VersetService();
await versetService.addVerset(versetData);

// Après (React Query)
const { createVerset, isCreating } = useVersetMutations();
await createVerset(versetData);
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
