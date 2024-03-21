'use server';
import prisma from '@/lib/prisma';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
    console.log(paypalTransactionId);
};
