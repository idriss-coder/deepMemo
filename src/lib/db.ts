import Dexie, {Table} from 'dexie';

export interface Verset {
    id?: number
    _id?: number
    book_num: number
    local_id?: number
    chapter_num: number
    verses_num: number[]
    content: string
    createdAt: Date
    user_id?: string
}

export interface OutboxItem {
    id?: number;
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    payload: Verset;
    createdAt?: Date;
}

export interface LocalUser {
    user_id: string,
    email: string;
    pseudo: string;
    createdAt: Date;
    loggedAt: Date,
}



export class MyAppDatabase extends Dexie {
    verses!: Table<Verset>;
    versesOutbox!: Table<OutboxItem>;
    profile!: Table<LocalUser>

    constructor() {
        super('DeepMemo');
        this.version(3).stores({
            verses: '++id, user_id, book_num, chapter_num, verses_num, content, createdAt',
            versesOutbox: '++id, type, payload, createdAt',
            profile: 'user_id, email, pseudo, createdAt, loggedAt'
        });
    }
}


export const db = new MyAppDatabase();
