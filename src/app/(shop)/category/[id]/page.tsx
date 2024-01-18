import { Text, Grid } from '@/components';
import { Product, Categories } from '@/interfaces';
import { CategoryT } from '@/interfaces/category.interface';
import { initialData } from '@/seed/seed';

const seedProducts = initialData.products;

export default function ({ params }: CategoryT): JSX.Element {
    const { id } = params;

    const products = seedProducts.filter(
        (product: Product): boolean => product.gender === id
    );

    const labels: Record<Categories, string> = {
        men: 'para Hombres',
        women: 'para Mujeres',
        kid: 'para Niños',
        unisex: 'para Todos',
    };

    return (
        <>
            <Text
                title={`Artículos de ${labels[id]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />
            <Grid products={products} />
        </>
    );
}
