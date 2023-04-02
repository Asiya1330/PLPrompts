import Prompt from '@/supabase/Prompt'
import supabase from '@/utils/supabase'
import { log } from 'console'
import React, { createContext, useEffect, useState } from 'react'

export const PromptsContext = createContext({
    prompts: null,
    setPrompts: () => null
})

export default function PromptsProvider({ children }) {

    const [prompts, setPrompts] = useState();

    useEffect(() => {
        const getAllPrompt = async () => {
            const { data, error } = await Prompt.find_all();
            setPrompts(data);
        }
        getAllPrompt();
    }, [])

    const value = { prompts, setPrompts };

    return (
        <PromptsContext.Provider value={value} >
            {children}
        </ PromptsContext.Provider>
    )
}
