const mongoose = require('mongoose');

// Connexion à la base de données
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deepmemo');
        console.log('MongoDB connecté');
    } catch (error) {
        console.error('Erreur de connexion MongoDB:', error);
        process.exit(1);
    }
};

// Schéma temporaire pour la migration
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', CategorySchema);

// Migration
const migrateCategories = async () => {
    try {
        console.log('Début de la migration des catégories...');
        
        // Récupérer toutes les catégories existantes
        const categories = await Category.find({});
        console.log(`${categories.length} catégories trouvées`);
        
        // Mettre à jour chaque catégorie pour ajouter isActive: false par défaut
        for (const category of categories) {
            if (category.isActive === undefined) {
                await Category.findByIdAndUpdate(category._id, { isActive: false });
                console.log(`Catégorie "${category.name}" mise à jour avec isActive: false`);
            }
        }
        
        console.log('Migration terminée avec succès !');
    } catch (error) {
        console.error('Erreur lors de la migration:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Déconnexion MongoDB');
    }
};

// Exécuter la migration
connectDB().then(() => {
    migrateCategories();
}); 