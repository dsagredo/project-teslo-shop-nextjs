import { Text } from '@/components';
import { Grid } from '@/components/Grid/Grid';
import { initialData } from '@/seed/seed';

const products = initialData.products;

export default function Home(): JSX.Element {
    return (
        <>
            <Text
                title="Tienda"
                subtitle="Todos los productos"
                className="mb-2"
            />
            <Grid products={products} />
        </>
    );
}
