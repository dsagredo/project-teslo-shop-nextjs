import Link from 'next/link';
import { Text } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import { PlaceOrder, Quantity } from '@/ui';
import { CheckoutInCart } from '@/ui';

export default function (): JSX.Element {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Text title="Verificar orden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href="/cart" className="underline mb-5">
                            Editor carrito
                        </Link>

                        {/* Items */}
                        <CheckoutInCart />
                    </div>
                    {/* Checkout */}
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
}
