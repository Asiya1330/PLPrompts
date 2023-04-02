import User from '@/supabase/User'
import supabase from '@/utils/supabase'
import { log } from 'console'
import React, { createContext, useEffect, useState } from 'react'

export type IUser = {
    email: string,
    username: string | undefined,
    avatar_url: string | undefined,
    password: string | undefined,
    id: string
}
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export default function UserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(UserContext);
    useEffect(() => {
        const getUserFromSession = async () => {
            const { error, data } = await User.get_session();

            if (data.session?.user) {
                const { user_metadata: { avatar_url }, id, email } = data.session?.user;
                console.log(data.session?.user, email, avatar_url, id, 'mounting');
                const useExist = await User.find({ email })
                if (!useExist.data.email) {                    
                    await User.addUser({ email, avatar_url, id })
                }
                return setCurrentUser({ email, avatar_url, id })

                // let currentUserObj = {
                //     email: userExist.data[0].email,
                //     id: userExist.data[0].id,
                //     avatar_url: userExist.data[0].avatar_url,
                //     username: userExist.data[0].username
                // };
                // return setCurrentUser(currentUserObj)
            }
            // if (data?.user) {
            //     console.log(data.user, 'not google ign in ');
            // }
            setCurrentUser(null)
        }

        getUserFromSession();
    }, []);

    const value = { currentUser, setCurrentUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
