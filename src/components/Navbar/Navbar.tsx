'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';
import { fonts } from '@/config/fonts';
import { State } from '@/interfaces';

export const Navbar = (): JSX.Element => {
    const [loaded, setLoaded] = useState(false);

    const openSide = useStore(
        (state: State): (() => void) => state.openSideMenu
    );

    const totalItemsInCart = useStore((state: State): number =>
        state.getTotalItems()
    );

    useEffect((): void => {
        setLoaded(true);
    }, []);
    return (
        <header className="flex px-5 justify-between items-center w-full">
            {/*<!-- Logo -->*/}
            <div>
                <Link href="/">
                    <span className="antialiased font-bold">Teslo</span>
                    <span> | Shop</span>
                </Link>
            </div>
            {/*<!-- Center Menu -->*/}
            <div className="hidden sm:block">
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/men"
                >
                    Hombres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/women"
                >
                    Mujeres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/kid"
                >
                    Niños
                </Link>
            </div>
            {/*<!-- Search - Cart - Menu -->*/}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link
                    href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
                    className="mx-2"
                >
                    <div className="relative">
                        {loaded && totalItemsInCart > 0 && (
                            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                {totalItemsInCart}
                            </span>
                        )}
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>
                <button
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    onClick={openSide}
                >
                    Menú
                </button>
            </div>
        </header>
    );
};
