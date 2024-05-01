import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { Tables, Text } from '@/components';
import { getPaginatedUsers } from '@/action';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function (): Promise<JSX.Element> {
    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>
            <Text title="Manteimiento de usuarios" />
            <div className="mb-10">
                <Tables users={users} />
            </div>
        </>
    );
}
