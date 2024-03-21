import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface SizeT {
    selectedSize: Size | undefined;
    availableSize: Size[];
    onSizeChanged: (size: Size) => void;
}

export const Sizes = ({
    selectedSize,
    availableSize,
    onSizeChanged,
}: SizeT): JSX.Element => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>
            <div className="flex">
                {availableSize.map(
                    (size: Size): JSX.Element => (
                        <button
                            key={size}
                            className={clsx('mx-2 text-lg', {
                                underline: size === selectedSize,
                            })}
                            onClick={(): void => onSizeChanged(size)}
                        >
                            {size}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
