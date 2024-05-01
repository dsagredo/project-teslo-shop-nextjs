import { ReactNode } from 'react';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}): Promise<JSX.Element> {
    const session = await auth();

    if (session?.user.role != 'admin') {
        redirect('/login');
    }

    return <>{children}</>;
}
