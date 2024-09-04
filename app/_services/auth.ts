import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });

                const response = await res.json();

                if (response?.code !== 200 || !response.data) {
                    return null;
                }

                return response.data
            },
        }),
    ],
    callbacks: {
        async jwt({token, user, profile, account, session, trigger}) {
            // console.log('auth jwt', {token, user, profile, account, session, trigger})
            return {...token, ...user};
        },
        async session({session, token: userData, user}) {
            // console.log('auth session', {session, userData, user})
            session.token = userData.token
            session.user = userData.user as any;

            return session;
        },
    }
});