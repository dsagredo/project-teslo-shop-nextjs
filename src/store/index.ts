import { create } from 'zustand';
import { CartProduct, State } from '@/interfaces';
import { persist } from 'zustand/middleware';

export const useStore = create<State>()(
    persist(
        (set: (partial: State | Partial<State>) => void, get: () => State) => ({
            isSideMenu: false,
            openSideMenu: (): void => set({ isSideMenu: true }),
            closeideMenu: (): void => set({ isSideMenu: false }),
            cart: [],
            clearCart: (): void => {
                set({ cart: [] });
            },
            addProductToCart: (product: CartProduct): void => {
                const { cart } = get();
                const productInCart = cart.some(
                    (item: CartProduct): boolean =>
                        item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                const updatedCartProducts = cart.map(
                    (item: CartProduct): CartProduct => {
                        if (
                            item.id === product.id &&
                            item.size === product.size
                        ) {
                            return {
                                ...item,
                                quantity: item.quantity + product.quantity,
                            };
                        }
                        return item;
                    }
                );

                set({ cart: updatedCartProducts });
            },
            getTotalItems: (): number => {
                const { cart } = get();
                return cart.reduce(
                    (total: number, item: CartProduct): number =>
                        total + item.quantity,
                    0
                );
            },
            updateProductQuantity: (
                product: CartProduct,
                quantity: number
            ): void => {
                const { cart } = get();
                const updateCartProducts = cart.map(
                    (item: CartProduct): CartProduct => {
                        if (
                            item.id === product.id &&
                            item.size === product.size
                        ) {
                            return { ...item, quantity: quantity };
                        }
                        return item;
                    }
                );
                set({ cart: updateCartProducts });
            },
            removeProduct: (product: CartProduct): void => {
                const { cart } = get();
                const updateCartProducts = cart.filter(
                    (item: CartProduct): boolean =>
                        item.id !== product.id || item.size !== product.size
                );
                set({ cart: updateCartProducts });
            },
            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce(
                    (subTotal: number, product: CartProduct): number =>
                        product.quantity * product.price + subTotal,
                    0
                );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce(
                    (subTotal: number, product: CartProduct): number =>
                        product.quantity * product.price + subTotal,
                    0
                );

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart,
                };
            },
            address: {
                firstName: '',
                lastName: '',
                address: '',
                addressOptional: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
            },
            setAddress: (address) => {
                set({ address });
            },
        }),
        {
            name: 'shopping-cart',
        }
    )
);
