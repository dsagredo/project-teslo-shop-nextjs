export const revalidate = 604800;
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fonts } from '@/config/fonts';
import { getProductBySlug } from '@/action';
import { Slideshow } from '@/components/Slideshow/Slideshow';
import { Stock } from '@/ui';
import AddToCart from '@/ui/AddToCart';

interface ProductT {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: ProductT): Promise<Metadata> {
    const slug = params.slug;

    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            images: [`/products/${product?.images[1]}`],
        },
    };
}

export default async function ({ params }: ProductT): Promise<JSX.Element> {
    const slug = params.slug;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    return (
        <div className="mt-5 mb-20 grid-cols-1 grid md:grid-cols-3 gap-3">
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">
                <Slideshow title={product.title} images={product.images} />
            </div>
            {/* Detalles */}
            <div className="col-span-1 px-5">
                <Stock slug={product.slug} />
                <h1
                    className={`${fonts.className} antialiased font-bold text-xl`}
                >
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price}</p>
                <AddToCart product={product} />
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-ligth">{product.description}</p>
            </div>
        </div>
    );
}
