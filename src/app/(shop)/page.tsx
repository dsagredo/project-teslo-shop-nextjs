import { Text, Grid, Pagination } from '@/components';
import { getPagination } from '@/action';
import { redirect } from 'next/navigation';

interface PropT {
    searchParams: {
        page?: string;
    };
}

export const revalidate = 60;

export default async function ({ searchParams }: PropT): Promise<JSX.Element> {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPagination({ page });

    if (products.length === 0) {
        redirect('/');
    }

    return (
        <>
            <Text
                title="Tienda"
                subtitle="Todos los productos"
                className="mb-2"
            />
            <Grid products={products} />
            <Pagination totalPages={totalPages} />
        </>
    );
}
