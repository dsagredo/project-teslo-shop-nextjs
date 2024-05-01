export interface CategoryT {
    id: string;
    name: string;
    params?: {
        gender: string;
    };
    searchParams?: {
        page?: string;
    };
}
