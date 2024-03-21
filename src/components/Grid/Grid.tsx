import { Product } from '@/interfaces';
import { Card } from '..';

interface GridT {
    products: Product[];
}

export const Grid = ({ products }: GridT): JSX.Element => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
        {products.map(
            (product: Product, index: number): JSX.Element => (
                <Card key={index} product={product} />
            )
        )}
    </div>
);
