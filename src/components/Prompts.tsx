//@ts-nocheck

import { PromptsContext } from '@/contexts/PromptsContext'
import { UserContext } from '@/contexts/UserContext';
import React, { useContext, useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import useRouter from 'next/router'

export default function Prompts() {
    const { prompts } = useContext(PromptsContext);
    const { currentUser } = useContext(UserContext);
    const [myPrompts, setMyPrompts] = useState();
    const router = useRouter;

    useEffect(() => {
        //@ts-ignore
        if (!currentUser || !currentUser.email) router.push('/login');
        console.log(currentUser,'in prompts');
        
        if (prompts && currentUser?._id) {
        //@ts-ignore
            const getMyPrompts = prompts.filter((prompt) => prompt.userId === currentUser._id);
            setMyPrompts(getMyPrompts)
        }
    }, [prompts])

    return (
        <div className='flex gap-4 flex-col'>
            <h1 className='' style={{
                fontSize: "30px",
                fontWeight: "bold",
            }}>
                Prompts
            </h1>
            <hr />
            <div className="w-full flex flex-row m-2 gap-2 mb-16 justify-start align-middle flex-wrap">

                { //@ts-ignore
                    myPrompts && myPrompts.map(({ name, price, type, images }: any, idx: number) => (
                    <PromptCard key={idx} name={name} price={price} tag={type} image={images[0]} />
                ))}
            </div>
        </div>
    )
}
