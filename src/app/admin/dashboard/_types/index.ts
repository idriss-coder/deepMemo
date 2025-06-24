export interface Category {
    _id: string;
    name: string;
    createdAt: string;
    versets?: Verset[];
}

export interface Verset {
    _id: string;
    book_num: number;
    chapter_num: number;
    verses_num: number[];
    content: string;
    createdAt: string;
    user_id?: string;
    category_id?: string;
    local_id: number;
}

export interface CategoryCardProps {
    category: Category;
    onUpdate: (id: string, name: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onAddVerset: (categoryId: string, versetData: {
        book_num: number;
        chapter_num: number;
        verses_num: number[];
        content: string;
    }) => Promise<void>;
    onRemoveVerset: (categoryId: string, versetId: string) => Promise<void>;
}

export interface CreateCategoryFormProps {
    onSubmit: (name: string) => Promise<void>;
    loading: boolean;
    error: string;
}

export interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    bgColor: string;
}

export interface StatsSectionProps {
    categories: Category[];
} 