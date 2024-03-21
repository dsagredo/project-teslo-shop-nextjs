import { fonts } from '@/config/fonts';
import RegisterForm from '@/ui/RegisterForm';

export default function (): JSX.Element {
    return (
        <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
            <h1 className={`${fonts.className} text-4xl mb-5`}>Registraste</h1>
            <RegisterForm />
        </main>
    );
}
