import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { inter } from '@/config/fonts';
import './globals.css';

export const metadata: Metadata = {
    title: 'Teslo | Shop',
    description: 'Una tienda virtual de productos',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
