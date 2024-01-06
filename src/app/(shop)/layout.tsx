import { Navbar } from '@/components';

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <main className="min-h-screen">
            <Navbar />
            {children}
        </main>
    );
}
