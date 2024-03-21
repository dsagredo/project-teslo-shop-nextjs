'use server';
import type { AddressT } from '@/interfaces/address.interface';
import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {
    try {
        const address = await prisma.address.findUnique({
            where: {
                userId,
            },
        });

        if (!address) return null;

        const { addressOptional, ...rest } = address;

        return {
            ...rest,
            addressOptional: addressOptional ? addressOptional : '',
        };
    } catch (error) {
        return null;
    }
};
