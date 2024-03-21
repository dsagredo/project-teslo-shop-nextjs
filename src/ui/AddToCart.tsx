'use client';

import { useState } from 'react';
import { CartProduct, Product, Size } from '@/interfaces';
import { Sizes, Quantity } from '.';
import { useStore } from '@/store';
import { State } from '@/interfaces';

interface ProductT {
    product: Product;
}

export default function ({ product }: ProductT): JSX.Element {
    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addProductToCart = useStore(
        (state: State): ((product: CartProduct) => void) =>
            state.addProductToCart
    );

    const addToCart = (): void => {
        setPosted(true);
        if (!size) return;
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0],
        };
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    };

    return (
        <>
            {posted && !size && (
                <span className="mt-2 text-red-500 fade-in">
                    Debe de seleccionar una talla*
                </span>
            )}

            <Sizes
                selectedSize={size}
                availableSize={product.sizes}
                onSizeChanged={setSize}
            />
            <Quantity quantity={quantity} onQuantityChanged={setQuantity} />
            <button className="btn-primary my-5" onClick={addToCart}>
                Agregar al carrito
            </button>
        </>
    );
}
