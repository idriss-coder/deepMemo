// dbConnect.ts

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

// Vérification de la variable d'environnement
if (!MONGODB_URI) {
    throw new Error("Veuillez définir la variable d'environnement MONGODB_URI");
}

/**
 * Global est utilisé ici pour stocker la connexion
 * dans un objet en dehors de la portée du module.
 * Ceci évite de recréer une connexion à chaque hot-reload
 * en développement.
 */
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

async function dbConnect() {
    // Si on est déjà connecté, on réutilise la connexion existante
    if (cached.conn) {
        return cached.conn;
    }

    // Sinon, si la promesse de connexion est déjà en cours, on l’attend
    if (!cached.promise) {
        const opts = {
            // Les options de connexion Mongoose, par ex. :
            bufferCommands: false,
            // useNewUrlParser: true, // (deprecated depuis Mongoose 6+)
            // useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
