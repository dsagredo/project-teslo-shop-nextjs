import { auth } from '@/auth.config';
import { Text } from '@/components';
import { redirect } from 'next/navigation';

export default async function (): Promise<JSX.Element> {
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login?returnTo=/perfil');
    }

    return (
        <>
            <Text title="Perfil" />
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </>
    );
}
