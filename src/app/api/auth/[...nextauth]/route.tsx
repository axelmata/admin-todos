import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/app/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,

    // Configure one or more authentication providers
    providers: [

        

        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                email: { label: "Correo electrónico", type: "email", placeholder: "usuario@google.com" },
                password: { label: "Contraseña", type: "password", placeholder: '******' }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await signInEmailPassword(credentials!.email, credentials!.password);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }

                return null;
            }


        }),
        // ...add more providers here
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            return true
        },

        async jwt({ token, user, account, profile }) {


            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

            if (dbUser?.isActived === false) {
                throw Error('Usuario no está activo');
            }


            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';

            return token;
        },

        async session({ session, token, user }) {

            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;

            }

            return session;
        }
    },

    session: { strategy: "jwt", },// para que funcionara en prisma que saltaba un error de JWT no valid
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };