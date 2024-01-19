import Link from 'next/link';
import { Text } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import { Quantity } from '@/ui';

const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function (): JSX.Element {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Text title="Carrito" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link href="/" className="underline mb-5">
                            Continúa comprado
                        </Link>

                        {/* Items */}
                        {productInCart.map((product, index) => (
                            <div key={index} className="flex mb-5">
                                <Image
                                    src={`/img/products/${product.images[0]}`}
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
                                    <p>{product.title}</p>
                                    <p>${product.price}</p>
                                    <Quantity quantity={3} />
                                    <button className="underline mt-3">
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-rigth">1 artículos</span>
                            <span>Subtotal</span>
                            <span className="text-rigth">$ 100</span>
                            <span>Impuestos (15%)</span>
                            <span className="text-rigth">$ 1</span>
                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-rigth">
                                $ 1
                            </span>
                        </div>
                        <div className="mb-5 mt-2 w-full">
                            <Link
                                className="flex btn-primary justify-center"
                                href="/checkout/address"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
