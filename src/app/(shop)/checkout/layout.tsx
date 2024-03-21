import { ReactNode } from 'react';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function CheckoutLayer({
    children,
}: {
    children: ReactNode;
}): Promise<JSX.Element> {
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login?redirectTo=/checkout/address');
    }
    return <>{children}</>;
}
