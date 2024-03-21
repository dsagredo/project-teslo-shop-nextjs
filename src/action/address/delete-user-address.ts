'use server';
import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
    try {
        const deleted = await prisma.address.delete({
            where: {
                userId,
            },
        });

        return {
            ok: true,
            address: deleted,
        };
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo eliminar la dirección',
        };
    }
};
