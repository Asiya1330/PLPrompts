// //@ts-nocheck
import { FetchUserByEmail, getUserById, registerRoute, updateUserStatusUrl } from '@/utils/apis';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router';
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
  const router = useRouter()
  console.log(session);

  useEffect(() => {
    const getUserFromSession = async () => {
      if (process.env.NEXT_PUBLIC_LOCALHOST_KEY) {
        const storedData = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALHOST_KEY);
        if (storedData) {
          const storedParseData = await JSON.parse(
            storedData
          );

          if (!storedParseData) {
            if (session && session.user) {

              const { data } = await axios.get(FetchUserByEmail, { params: { email: session.user.email } })
              if (data) setCurrentUser(data)
              else {                
                const registeredUser = await axios.post(registerRoute, {
                  username: session.user.name,
                  email: session.user.email,
                  avatarImage: session.user.image,
                  status: 'verified'
                })
                console.log(registeredUser, 'registersUser');
                // setCurrentUser(registeredUser.data)
              }
            }
          }
          else if (storedParseData) setCurrentUser(storedParseData)
          else setCurrentUser(null)
        }

      }
    }
    getUserFromSession();
  }, [session]);


  useEffect(() => {
    if (router?.query && router?.query?.token) {
      setCurrentUser(null)
      const checkUser = async () => {
        const { data } = await axios.get(`${getUserById}/${router.query.token}`);
        console.log(data.status);

        if (data && data?.status === 'verified') alert("You are already verified");
        else if (data) {
          const updateUserStatus = await axios.post(updateUserStatusUrl, {
            _id: router.query.token
          })
          if (updateUserStatus.data.modifiedCount) {
            alert("Congratulations! You have been verified.")
            router.push("/login")
          }
        }
      }
      checkUser();
    }

  }, [router.query])

  const value = { currentUser, setCurrentUser }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
