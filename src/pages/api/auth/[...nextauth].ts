import { registerRoute } from '@/utils/apis';
import axios from 'axios';
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google';


export default NextAuth({
    providers: [
        GoogleProvider({
            //@ts-ignore
            clientId: process.env.GOOGLE_CLIENTID,
            //@ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        session({ session, token }) {
            if (session.user) {
                //@ts-ignore
                session.user.id = token.sub as string;
            }
            return session;
        },
        signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true;
            axios.post(registerRoute, {
                username: user.name,
                email: user.email,
                _id: user.id,
                avatarImage: user.image,
                status: 'verified'
            })
            console.log('sigcudncd');
            
            if (isAllowedToSignIn) {
                return true
            } else {
                return false
            }
        }
    },
})