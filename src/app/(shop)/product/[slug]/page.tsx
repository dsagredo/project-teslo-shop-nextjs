import { Product } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import { fonts } from '@/config/fonts';
import Size from '@/ui/Size';
import { Quantity } from '@/ui/Quantity';
import Slideshow from '@/components/Slideshow/Slideshow';

interface ProductT {
    slug: string;
}

export default function ({ params }: { params: ProductT }): JSX.Element {
    const { slug } = params;
    const product = initialData.products.find(
        (product: Product): boolean => product.slug === slug
    );

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
                <h1
                    className={`${fonts.className} antialiased font-bold text-xl`}
                >
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price}</p>
                {/* Selector de Tallas */}
                <Size
                    selectedSize={product.sizes[0]}
                    availableSize={product.sizes}
                />
                {/* Selector de Cantidad */}
                <Quantity quantity={2} />

                <button className="btn-primary my-5">Agregar al carrito</button>
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-ligth">{product.description}</p>
            </div>
        </div>
    );
}
