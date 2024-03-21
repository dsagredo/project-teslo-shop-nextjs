import { Navbar, Sidebar, Footer } from '@/components';

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Sidebar />
            <div className="px-0 sm:px-10">{children}</div>
            <Footer />
        </main>
    );
}
