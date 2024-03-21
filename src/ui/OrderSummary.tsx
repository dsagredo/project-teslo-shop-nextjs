'use client';

import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { State } from '@/interfaces';
import { currencyFormat } from '../utils/currencyFormat';
import { useRouter } from 'next/navigation';

export const OrderSummary = (): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const { itemsInCart, subTotal, tax, total } = useStore((state: State) =>
        state.getSummaryInformation()
    );

    useEffect((): void => {
        setLoaded(true);
    }, []);

    useEffect((): void => {
        if (itemsInCart === 0 && loaded === true) {
            router.replace('/empty');
        }
    }, [itemsInCart, loaded]);

    if (!loaded) return <p>Cargando...</p>;

    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-rigth">
                {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
            </span>
            <span>Subtotal</span>
            <span className="text-rigth">{currencyFormat(subTotal)}</span>
            <span>Impuestos (15%)</span>
            <span className="text-rigth">{currencyFormat(tax)}</span>
            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-rigth">
                {currencyFormat(total)}
            </span>
        </div>
    );
};
