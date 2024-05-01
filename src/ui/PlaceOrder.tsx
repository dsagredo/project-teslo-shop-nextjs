'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CartProduct, State } from '@/interfaces';
import { useStore } from '@/store';
import { currencyFormat, sleep } from '@/utils';
import { placeOrder } from '@/action';
import { useRouter } from 'next/navigation';

export const PlaceOrder = (): JSX.Element => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const address = useStore((state) => state.address);
    const cart = useStore((state: State) => state.cart);
    const clearCart = useStore((state: State) => state.clearCart);

    const { itemsInCart, subTotal, tax, total } = useStore((state: State) =>
        state.getSummaryInformation()
    );

    useEffect((): void => {
        setLoaded(true);
    }, []);

    const onPlaceOrder = async (): Promise<void> => {
        setIsPlacingOrder(true);
        await sleep(2);
        const productsToOrder = cart.map((product: CartProduct) => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));
        const res = await placeOrder(productsToOrder, address);
        if (!res.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(res.message);
            return;
        }

        clearCart();
        router.replace('/orders/' + res.order?.id);
    };

    if (!loaded) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
                <p className="text-xl">
                    {address.firstName} {address.lastName}
                </p>
                <p>{address.address}</p>
                <p>{address.addressOptional}</p>
                <p>{address.postalCode}</p>
                <p>
                    {address.city} {address.country}
                </p>
                <p>{address.phone}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                    {itemsInCart === 1
                        ? '1 artículo'
                        : `${itemsInCart} artículos`}
                </span>
                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>
                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>
                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">
                    {currencyFormat(total)}
                </span>
            </div>
            <div className="mt-5 mb-2 w-full">
                <p className="mb-5">
                    <span className="text-xs">
                        Al hacer clic en {`"Colocar orden"`}, aceptas nuestros{' '}
                        <a href="#" className="underline">
                            {' '}
                            términos y condiciones{' '}
                        </a>{' '}
                        y{' '}
                        <a href="#" className="underline">
                            {' '}
                            política de privacidad{' '}
                        </a>
                    </span>
                </p>
                <p className="text-red-500">{errorMessage}</p>
                <button
                    onClick={onPlaceOrder}
                    className={clsx({
                        'btn-primary': !isPlacingOrder,
                        'btn-disabled': isPlacingOrder,
                    })}
                >
                    Colocar order
                </button>
            </div>
        </div>
    );
};
