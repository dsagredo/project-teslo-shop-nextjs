import { fonts } from '@/config/fonts';
import Link from 'next/link';

export const Footer = (): JSX.Element => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href="/">
                <span className={`${fonts.className} antialiased font-bold`}>
                    Teslo
                </span>
                <span>| Shop</span>
                <span>© {new Date().getFullYear()}</span>
            </Link>
        </div>
    );
};
