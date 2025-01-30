// lib/db.ts
import Dexie, {Table} from 'dexie';

// Exemple d'interface pour le type d'objets que vous souhaitez stocker
export interface Quiz {
    id?: number;       // '?' signifie que l'ID est auto-incrémenté
    question: string;
    answer: string;
    createdAt: Date;
}

// On définit une classe qui hérite de Dexie
export class MyAppDatabase extends Dexie {
    // Déclarez vos tables sous forme de propriétés
    quizzes!: Table<Quiz>;

    constructor() {
        super('DeepMemo'); // Nom de votre base (sera visible dans IndexedDB)
        this.version(1).stores({
            // '++id' = auto-incrément
            quizzes: '++id, question, answer, createdAt',
            // Ajoutez d'autres tables si besoin...
        });
    }
}

// Exporter une instance réutilisable de la BDD
export const db = new MyAppDatabase();
