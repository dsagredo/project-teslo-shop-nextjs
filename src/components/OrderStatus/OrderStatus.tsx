import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';

export const OrderStatus = ({
    isPaid,
}: {
    isPaid: boolean | undefined;
}): JSX.Element => {
    return (
        <div
            className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                    'bg-red-500': !isPaid,
                    'bg-green-700': isPaid,
                }
            )}
        >
            <IoCardOutline size={30} />
            <span className="mx-2">{isPaid ? 'Pagada' : 'No pagada'}</span>
        </div>
    );
};
