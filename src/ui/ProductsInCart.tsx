'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/store';
import { Quantity } from '@/ui';
import { State } from '@/interfaces/store.interface';
import { CartProduct } from '@/interfaces';
import Link from 'next/link';

export const ProductsInCart = (): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    const productInCart = useStore((state: State): CartProduct[] => state.cart);

    const updateProductQuantity = useStore(
        (state: State): ((product: CartProduct, quantity: number) => void) =>
            state.updateProductQuantity
    );
    const removeProduct = useStore(
        (state: State): ((product: CartProduct) => void) => state.removeProduct
    );

    useEffect((): void => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            {productInCart.map(
                (product: CartProduct, index: number): JSX.Element => (
                    <div key={index} className="flex mb-5">
                        <Image
                            src={`/img/products/${product.image}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <Quantity
                                quantity={product.quantity}
                                onQuantityChanged={(quantity: number): void =>
                                    updateProductQuantity(product, quantity)
                                }
                            />
                            <button
                                className="underline mt-3"
                                onClick={(): void => removeProduct(product)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                )
            )}
        </>
    );
};
