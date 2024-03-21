import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { inter } from '@/config/fonts';
import { Providers } from '@/provider';
import './globals.css';

export const metadata: Metadata = {
    title: {
        template: '%s - Teslo | Shop',
        default: 'Home - Teslo | Shop',
    },
    description: 'Una tienda virtual de productos',
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    return (
        <html lang="es">
            <body suppressHydrationWarning={true} className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
