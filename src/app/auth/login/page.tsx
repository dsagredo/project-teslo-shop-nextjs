import { fonts } from '@/config/fonts';
import { LoginForm } from '@/ui';

export default function (): JSX.Element {
    return (
        <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
            <h1 className={`${fonts.className} text-4xl mb-5`}>Ingresar</h1>
            <LoginForm />
        </main>
    );
}
