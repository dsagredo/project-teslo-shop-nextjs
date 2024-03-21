import { CartProduct } from '.';

export interface State {
    isSideMenu: boolean;
    openSideMenu: () => void;
    closeideMenu: () => void;
    cart: CartProduct[];
    clearCart: () => void;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
    getTotalItems: () => number;
    address: {
        firstName: string;
        lastName: string;
        address: string;
        addressOptional?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    };
    setAddress: (address: State['address']) => void;
}
