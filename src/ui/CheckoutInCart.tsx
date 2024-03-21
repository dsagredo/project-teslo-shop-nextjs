'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/store';
import { State } from '@/interfaces/store.interface';
import { CartProduct } from '@/interfaces';
import { currencyFormat } from '../utils/currencyFormat';

export const CheckoutInCart = (): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    const productInCart = useStore((state: State): CartProduct[] => state.cart);

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
                            <span>
                                {product.title} - {product.size} (
                                {product.quantity})
                            </span>
                            <p className="font-bold">
                                {currencyFormat(
                                    product.price * product.quantity
                                )}
                            </p>
                        </div>
                    </div>
                )
            )}
        </>
    );
};
