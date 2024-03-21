import { Size } from '.';

export interface PlaceOrderT {
    productId: string;
    quantity: number;
    size: Size;
}

export interface OrderByIdT {
    ok: boolean;
    message?: string;
    order?: {
        id: string;
        subTotal: number;
        tax: number;
        total: number;
        itemsInOrder: number;
        isPaid: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        OrderAddress: any;
        OrderItem: any;
    } | null;
}

export interface OrderByUserT {
    ok: boolean;
    message?: string;
    orders?: Array<{
        OrderAddress: { firstName: string; lastName: string } | null;
        id: string;
        subTotal: number;
        tax: number;
        total: number;
        itemsInOrder: number;
        isPaid: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
