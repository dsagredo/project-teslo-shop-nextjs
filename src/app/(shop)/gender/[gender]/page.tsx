import { Text, Grid, Pagination } from '@/components';
import { redirect } from 'next/navigation';
import { Gender } from '@prisma/client';
import { getPagination } from '@/action';

export const revalidate = 60;

export interface CategoryT {
    params: {
        gender: string;
    };
    searchParams: {
        page: string;
    };
}

export default async function ({
    params,
    searchParams,
}: CategoryT): Promise<JSX.Element> {
    const { gender } = params;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPagination({
        page,
        gender: gender as Gender,
    });

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string> = {
        men: 'para Hombres',
        women: 'para Mujeres',
        kid: 'para Niños',
        unisex: 'para Todos',
    };

    return (
        <>
            <Text
                title={`Artículos de ${labels[gender]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />
            <Grid products={products} />

            <Pagination totalPages={totalPages} />
        </>
    );
}
