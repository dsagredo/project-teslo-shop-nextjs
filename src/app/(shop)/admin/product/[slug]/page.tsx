import { Text } from '@/components';
import { getCategories, getProductBySlug } from '@/action';
import { redirect } from 'next/navigation';
import { ProductForm } from '@/ui/ProductForm';

interface ProductT {
    params: {
        slug: string;
    };
}

export default async function ({ params }: ProductT): Promise<JSX.Element> {
    const { slug } = params;

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories(),
    ]);

    if (!product && slug !== 'new') {
        redirect('/admin/products');
    }

    const title = slug === 'new' ? 'Nuevo producto' : 'Editor producto';

    return (
        <>
            <Text title={title} />
            <ProductForm product={product ?? {}} categories={categories} />
        </>
    );
}
