'use server';

import { auth } from '@/auth.config';
import { OrderByUserT } from '@/interfaces/placeOrder.interface';
import prisma from '@/lib/prisma';

export const getOrderByUser = async (): Promise<OrderByUserT> => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado',
        };
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    return {
        ok: true,
        orders: orders,
    };
};
