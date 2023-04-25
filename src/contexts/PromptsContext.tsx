//@ts-nocheck
import { getAllPrompts, getAllPromptsByHourlyFactor, getNonApprovedAllPromptsUrl } from '@/utils/apis';
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const PromptsContext = createContext({
    prompts: null,
    setPrompts: () => null,
    unapprovedPrompts: [],
    setUnapprovedPrompts: () => null,
    featuredPrompts: [],
    setFeaturedPrompts: () => null,
    newestPrompts: [],
    setNewestPrompts: () => null
})

export default function PromptsProvider({ children }) {

    const [prompts, setPrompts] = useState();
    const [unapprovedPrompts, setUnapprovedPrompts] = useState([]);
    const [featuredPrompts, setFeaturedPrompts] = useState([]);
    const [newestPrompts, setNewestPrompts] = useState([]);

    useEffect(() => {
        const getNotApprovedPrompts = async () => {
            const { data } = await axios.get(getNonApprovedAllPromptsUrl);
            setUnapprovedPrompts(data);
        }
        getNotApprovedPrompts();
    }, [])

    useEffect(() => {
        const getFeatureedPrompts = async () => {
            const { data } = await axios.get(getAllPrompts, {
                params: {
                    condition: 'featured'
                }
            });
            setFeaturedPrompts(data);
        }
        getFeatureedPrompts();
    }, [])

    useEffect(() => {
        const getNewestPrompts = async () => {
            const { data } = await axios.get(getAllPrompts, {
                params: {
                    condition: 'newest'
                }
            });
            setNewestPrompts(data);
        }
        getNewestPrompts();
    }, [])

    useEffect(() => {
        const getAllPrompt = async () => {
            const { data } = await axios.get(getAllPromptsByHourlyFactor);
            console.log(data);

            setPrompts(data);
        }
        getAllPrompt();
    }, [])

    const value = {
        prompts,
        setPrompts,
        unapprovedPrompts,
        setUnapprovedPrompts,
        setFeaturedPrompts,
        featuredPrompts,
        newestPrompts,
        setNewestPrompts
    };

    return (
        <PromptsContext.Provider value={value} >
            {children}
        </ PromptsContext.Provider>
    )
}
