import Image from 'next/image';
import { StyleHTMLAttributes } from 'react';

interface PImageT {
    src?: string;
    alt: string;
    className?: StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;
}

export const ProductImage = ({
    src,
    alt,
    className,
    style,
    width,
    height,
}: PImageT): JSX.Element => {
    const localSrc = src
        ? src.startsWith('http')
            ? src
            : `/img/products/${src}`
        : '/img/placeholder.jpg';

    return (
        <Image
            src={localSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
        />
    );
};
