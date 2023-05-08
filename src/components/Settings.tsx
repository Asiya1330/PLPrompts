import { UserContext } from '@/contexts/UserContext'
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react'

export default function Settings() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [username, setUsername] = useState();
    const route = useRouter();

    const handleSignOut = async () => {
        await signOut()
        setCurrentUser(null)
        localStorage.setItem(
            //@ts-ignore
            process.env.NEXT_PUBLIC_LOCALHOST_KEY,
            null
        );
        route.push('/login')
    }

    const handleUsername = async (e: any) => {
        setUsername(e.target.value)
    }

    return (
        <div className='flex gap-4 flex-col'>
            <h1 className='' style={{
                fontSize: "30px",
                fontWeight: "bold",
            }}>
                Settings
            </h1>
            <hr />
            <div>
                <div className="usernameSec">

                    <label>username</label>
                    <div className='flex flex-row justify-center ' style={{
                        alignItems: "center"
                    }} >
                        <span className='mb-2' style={{
                            fontSize: '40px',
                        }}>@ </span>
                        <input className="login-input focus:outline-none focus:shadow-outline " type="text" value={//@ts-ignore
                            currentUser?.username ? currentUser?.username : username} onChange={handleUsername} placeholder='set username' />
                        {username && <button className='active:bg-gray-200 active:text-black'>Set Username</button>}
                    </div>
                </div>
                <button className="btn logout-btn active:bg-gray-200 active:text-black" onClick={handleSignOut}>Logout</button>
            </div>
        </div>
    )
}
