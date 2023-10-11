import prisma from "./prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { NextAuthOptions, getServerSession } from 'next-auth'


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text", placeholder: "jsmith" },
            },
            async authorize(credentials: any) {
                if (!credentials.email || !credentials.password) {
                    throw new Error("Please enter an email and password");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("No user found");
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!passwordsMatch) {
                    throw new Error("Incorrect password");
                }
                
                return user;
            }
        }),
    ],
    secret: process.env.SECRET,
    
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: async ({ session, token, user }: any) => {
            if(token?.uid) {
                session.user.id = token.uid;
            }
            if (user?.id) {
                session.user.id = user.id;
            }
            return session;
          },
          jwt: async ({ user, token }) => {
            if (user) {
              token.uid = user.id;
            }
            return token;
          },

    
    },
   
    debug: process.env.NODE_ENV === "development",
};

export const getAuthSession = () => getServerSession(authOptions);