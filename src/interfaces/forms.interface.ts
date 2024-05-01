export interface FormInputT {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    categoryId: string;
    images?: FileList;
}
