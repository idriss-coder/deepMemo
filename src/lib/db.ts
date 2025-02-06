import Dexie, {Table} from 'dexie';

export interface Verset {
    id?: number
    book_num: number
    chapter_num: number
    verses_num: number[]
    content: string
    createdAt: Date
}


export class MyAppDatabase extends Dexie {
    verses!: Table<Verset>;

    constructor() {
        super('DeepMemo');
        this.version(1).stores({
            verses: '++id, book_num, chapter_num, verses_num, content, createdAt',
        });
    }
}

export const db = new MyAppDatabase();
