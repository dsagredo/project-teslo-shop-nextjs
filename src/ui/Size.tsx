import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface SizeT {
    selectedSize: Size;
    availableSize: Size[];
}

export default function ({ selectedSize, availableSize }: SizeT): JSX.Element {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>
            <div className="flex">
                {availableSize.map(
                    (size: Size): JSX.Element => (
                        <button
                            key={size}
                            className={clsx('mx-2 text-lg', {
                                'font-bold': size === selectedSize,
                            })}
                        >
                            {size}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
