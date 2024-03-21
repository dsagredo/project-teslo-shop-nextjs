'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface ProvidersT {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersT): JSX.Element => {
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
                intent: 'capture',
                currency: 'USD',
            }}
        >
            <SessionProvider>{children}</SessionProvider>
        </PayPalScriptProvider>
    );
};
