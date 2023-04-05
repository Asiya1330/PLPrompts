//@ts-nocheck
import { getAllPromptsByHourlyFactor, getNonApprovedAllPromptsUrl } from '@/utils/apis';
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const PromptsContext = createContext({
    prompts: null,
    setPrompts: () => null,
    unapprovedPrompts: [],
    setUnapprovedPrompts: () => null
})

export default function PromptsProvider({ children }) {

    const [prompts, setPrompts] = useState();
    const [unapprovedPrompts, setUnapprovedPrompts] = useState([]);

    useEffect(() => {
        const getNotApprovedPrompts = async () => {
            const { data } = await axios.get(getNonApprovedAllPromptsUrl);
            setUnapprovedPrompts(data);
        }
        getNotApprovedPrompts();
    }, [])

    useEffect(() => {
        const getAllPrompt = async () => {
            const {data} = await axios.get(getAllPromptsByHourlyFactor);
            setPrompts(data);
        }
        getAllPrompt();
    }, [])

    const value = { prompts, setPrompts, unapprovedPrompts, setUnapprovedPrompts };

    return (
        <PromptsContext.Provider value={value} >
            {children}
        </ PromptsContext.Provider>
    )
}
