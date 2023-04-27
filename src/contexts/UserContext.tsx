// //@ts-nocheck
import { useSession, signIn, signOut } from 'next-auth/react'
import { createContext, useState, useEffect } from "react";


export type IUser = {
    email: string,
    username: string | undefined,
    avatar_url: string | undefined,
    password: string | undefined,
    _id: string,
    isAvatarImageSet: string,
    avatarImage: string
}
type UserContextType = {
    currentUser: UserContextType | null | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserContextType | null | undefined>>;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => null
})

export default function UserProvider({ children }: any) {
    // const [currentUser, setCurrentUser] = useState(UserContext);
    const [currentUser, setCurrentUser] = useState<UserContextType | null>();
    const { data: session } = useSession();
    console.log(session);

    useEffect(() => {
        const getUserFromSession = async () => {
            if (process.env.NEXT_PUBLIC_LOCALHOST_KEY) {
                const storedData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALHOST_KEY);
                if (storedData) {
                    const data = await JSON.parse(
                        storedData
                    );
                    if (!data) {
                        if (session && session.user) {
                            const { user } = session;
                            const userObj: IUser = {
                                email: user.email,
                                _id: `${user.id}000`,
                                avatarImage: user.image,
                                username: user.name
                            }
                            setCurrentUser(userObj)
                        }
                    }
                    else if (data) setCurrentUser(data)
                    else setCurrentUser(null)
                }

            }
        }
        getUserFromSession();
    }, [session]);

    const value = { currentUser, setCurrentUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
