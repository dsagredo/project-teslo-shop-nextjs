'use client';

import { useEffect, useState } from 'react';
import { getStockBySlug } from '@/action';
import { fonts } from '@/config/fonts';

interface StockT {
    slug: string;
}

export const Stock = ({ slug }: StockT): JSX.Element => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect((): void => {
        const getStock = async (): Promise<void> => {
            const inStock = await getStockBySlug(slug);
            setStock(inStock);
            setIsLoading(false);
        };

        getStock();
    }, [slug]);

    return (
        <>
            {!isLoading ? (
                <h1
                    className={`${fonts.className} antialiased font-bold text-md`}
                >
                    Stock: {stock}
                </h1>
            ) : (
                <div className="w-full">
                    <div className="flex space-x-4 animate-pulse">
                        <div className="flex-1">
                            <div className="h-6 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
