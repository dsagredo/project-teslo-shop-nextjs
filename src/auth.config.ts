import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    callbacks: {
        authorized({
            auth,
            request: { nextUrl },
        }: {
            auth: any;
            request: { nextUrl: any };
        }): boolean | Response {
            /*const isLoggendIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggendIn) return true;
                return false;
            } else if (isLoggendIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }*/
            return true;
        },
        jwt({ token, user }: { token: any; user: any }): any {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({
            session,
            token,
            user,
        }: {
            session: any;
            token: any;
            user: any;
        }): any {
            session.user = token.data;
            return session;
        },
    },
    providers: [
        Credentials({
            credentials: {},
            async authorize(
                credentials: Record<string, string> | undefined,
                _req
            ) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data;

                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() },
                });

                if (!user) return null;

                if (!bcryptjs.compareSync(password, user.password)) return null;

                return user;
            },
        }),
    ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
