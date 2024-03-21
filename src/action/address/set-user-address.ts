'use server';
import type { AddressT } from '@/interfaces/address.interface';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: AddressT, userId: string) => {
    try {
        const newAddress = await createAddress(address, userId);

        return {
            ok: true,
            address: newAddress,
        };
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo grabar la dirección',
        };
    }
};

const createAddress = async (userAddress: AddressT, userId: string) => {
    try {
        const address = await prisma.address.findUnique({
            where: {
                userId,
            },
        });

        const addressToSave = {
            userId: userId,
            address: userAddress.address,
            addressOptional: userAddress.addressOptional,
            countryId: userAddress.country,
            firstName: userAddress.firstName,
            lastName: userAddress.lastName,
            phone: userAddress.phone,
            postalCode: userAddress.postalCode,
            city: userAddress.city,
        };

        if (!address) {
            const newAddress = prisma.address.create({
                data: addressToSave,
            });
            return newAddress;
        }

        const updatedAddress = await prisma.address.update({
            where: {
                userId,
            },
            data: addressToSave,
        });

        return updatedAddress;
    } catch (error) {
        throw new Error('No se pudo grabar la dirección');
    }
};
