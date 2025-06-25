# Fonctionnalité d'Activation/Désactivation des Catégories

## Vue d'ensemble

Cette fonctionnalité permet aux administrateurs d'activer ou désactiver des catégories de versets. Les catégories désactivées ne sont pas visibles pour les utilisateurs finaux et ne peuvent pas recevoir de nouveaux versets.

## Fonctionnalités

### 🎯 **Activation/Désactivation**
- **Toggle visuel** : Bouton Power/PowerOff avec design Riot Games-like
- **État par défaut** : Les nouvelles catégories sont créées désactivées
- **Effet visuel** : Les catégories désactivées ont un effet "disabled" avec opacité réduite

### 🎨 **Design Riot Games-like**
- **Couleurs** : Rouge pour désactivé, vert pour activé
- **Animations** : Transitions fluides et spinners de chargement
- **Badge** : Indicateur "DÉSACTIVÉE" sur les catégories inactives
- **Effets** : Opacité réduite et bordures rouges pour les catégories désactivées

### 🔒 **Sécurité et Logique**
- **API** : Paramètre `includeDisabled` pour filtrer les catégories
- **Validation** : Impossible d'ajouter des versets aux catégories désactivées
- **Filtrage** : Les versets des catégories désactivées sont exclus des requêtes utilisateur

## Implémentation Technique

### Base de données
```javascript
// Modèle Category
{
  name: String,
  isActive: Boolean, // Nouveau champ
  createdAt: Date
}
```

### API Endpoints

#### GET /api/categories
```javascript
// Paramètres
?includeDisabled=true  // Inclut les catégories désactivées (admin)
?includeDisabled=false // Exclut les catégories désactivées (user)
```

#### POST /api/categories
```javascript
// Création avec isActive: false par défaut
{
  name: "Nouvelle catégorie",
  isActive: false // Par défaut
}
```

#### PUT /api/categories
```javascript
// Toggle d'activation
{
  id: "category_id",
  isActive: true/false
}
```

### React Query Hooks

```javascript
// Hook useCategories
const {
  categories,
  toggleActive,
  isToggling,
  // ... autres propriétés
} = useCategories(includeDisabled);

// Utilisation
await toggleActive({ id: categoryId, isActive: !currentState });
```

## Interface Utilisateur

### Dashboard Admin
- **Vue complète** : Affiche toutes les catégories (actives et désactivées)
- **Toggle button** : Bouton Power/PowerOff pour chaque catégorie
- **Indicateurs visuels** : Badges et couleurs pour distinguer les états

### Interface Utilisateur
- **Filtrage automatique** : Seules les catégories actives sont visibles
- **Protection** : Impossible d'accéder aux versets des catégories désactivées

## Migration

### Script de Migration
```bash
# Exécuter le script de migration
node src/scripts/migrate-categories.js
```

Le script ajoute automatiquement `isActive: false` à toutes les catégories existantes.

## Utilisation

### Pour les Administrateurs
1. **Créer une catégorie** : Elle est automatiquement désactivée
2. **Activer la catégorie** : Cliquer sur le bouton Power pour l'activer
3. **Désactiver la catégorie** : Cliquer sur le bouton PowerOff pour la désactiver
4. **Gérer les versets** : Seules les catégories actives peuvent recevoir des versets

### Pour les Utilisateurs
- **Transparence** : Les catégories désactivées sont automatiquement filtrées
- **Performance** : Seuls les versets des catégories actives sont chargés
- **Sécurité** : Impossible d'accéder aux contenus des catégories désactivées

## Avantages

### 🚀 **Performance**
- Réduction des requêtes inutiles
- Filtrage côté serveur
- Cache optimisé avec React Query

### 🔒 **Sécurité**
- Contrôle d'accès granulaire
- Validation côté serveur
- Protection contre les accès non autorisés

### 🎨 **Expérience Utilisateur**
- Interface intuitive
- Feedback visuel immédiat
- Animations fluides
- Design cohérent avec Riot Games

### 🛠 **Maintenabilité**
- Code modulaire
- Hooks réutilisables
- API RESTful
- Documentation complète

## Configuration

### Variables d'Environnement
```env
MONGODB_URI=mongodb://localhost:27017/deepmemo
```

### Dépendances
```json
{
  "@tanstack/react-query": "^5.0.0",
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.300.0"
}
```

## Support

Pour toute question ou problème lié à cette fonctionnalité, consultez :
- La documentation de l'API
- Les logs de migration
- Les tests unitaires
- L'interface d'administration 