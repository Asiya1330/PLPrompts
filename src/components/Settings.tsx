import { UserContext } from '@/contexts/UserContext'
import React, { useContext, useState } from 'react';
import userHelperFuncs from '../supabase/User'
import { useRouter } from 'next/router';

export default function Settings() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log(currentUser, 'settings');
    const [username, setUsername] = useState();
    const route = useRouter();

    const handleSignOut = async () => {
        await userHelperFuncs.userSignOut();
        setCurrentUser(null)
        route.push('/login')
    }

    const handleUsername = async (e) => {

        setUsername(e.target.value)
        // await userHelperFuncs.userSignOut();
        // setCurrentUser(null)
        // route.push('/login')
    }
    const changeUsername = () => {

        // const params = {}
        // await modifyUser()
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
                        <input className="login-input focus:outline-none focus:shadow-outline " type="text" value={currentUser?.username ? currentUser?.username : username} onChange={handleUsername} placeholder='set username' />
                        {username && <button onClick={changeUsername} className='active:bg-gray-200 active:text-black'>Set Username</button>}
                    </div>
                </div>
                <button className="btn logout-btn active:bg-gray-200 active:text-black" onClick={handleSignOut}>Logout</button>
            </div>
        </div >
    )
}