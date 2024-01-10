import Image from 'next/image';
import Link from 'next/link';
import { fonts } from '@/config/fonts';

export const NotFoundPage = (): JSX.Element => {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            <div className="text-center px-5 mx-5">
                <h2 className={`${fonts.className} antialiased text-9xl`}>
                    400
                </h2>
                <p className="font-semibold text-xl">
                    Whoops! lo sentimos mucho.
                </p>
                <p className="font-light">
                    <span>Puedes recargar al </span>
                    <Link
                        href="/"
                        className="font-normal hover:underline transition-all"
                    >
                        inicio
                    </Link>
                </p>
            </div>
            <div className="px-5 mx-4">
                <Image
                    src="/img/starman_750x750.png"
                    alt="Starman"
                    className="p-5 sm:p-0"
                    width={550}
                    height={550}
                />
            </div>
        </div>
    );
};
