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
    setNewestPrompts: () => null,
    monthlySortedPrompts: [],
    setMonthlySortedPrompts: () => null,
    weeklySortedPrompts: [],
    setWeeklySortedPrompts: () => null
})

export default function PromptsProvider({ children }) {

    const [prompts, setPrompts] = useState();
    const [unapprovedPrompts, setUnapprovedPrompts] = useState([]);
    const [featuredPrompts, setFeaturedPrompts] = useState([]);
    const [newestPrompts, setNewestPrompts] = useState([]);
    const [monthlySortedPrompts, setMonthlySortedPrompts] = useState([])
    const [weeklySortedPrompts, setWeeklySortedPrompts] = useState([])

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
            setPrompts(data);
        }
        getAllPrompt();
    }, [])

    useEffect(() => {
        if (prompts) {
            const copy = [...prompts] //sort is mutating function, so create copy of state, then sort
            const monthlySortedArray = copy.sort((a, b) => {
                if (a.monthlyScore > b.monthlyScore) {
                    return -1;
                }
                if (a.monthlyScore < b.monthlyScore) {
                    return 1;
                }
                return 0;
            });
            setMonthlySortedPrompts(monthlySortedArray);
        }
    }, [prompts])

    useEffect(() => {
        if (prompts) {
            const copy = [...prompts]  //sort is mutating function, so create copy of state, then sort

            const weeklySortedArray = copy.sort((a, b) => {
                if (a.weeklyScore > b.weeklyScore) {
                    return -1;
                }
                if (a.weeklyScore < b.weeklyScore) {
                    return 1;
                }
                return 0;
            });
            setWeeklySortedPrompts(weeklySortedArray);
        }
    }, [prompts])

    const value = {
        prompts,
        setPrompts,
        unapprovedPrompts,
        setUnapprovedPrompts,
        setFeaturedPrompts,
        featuredPrompts,
        newestPrompts,
        setNewestPrompts,
        weeklySortedPrompts,
        monthlySortedPrompts
    };

    return (
        <PromptsContext.Provider value={value} >
            {children}
        </ PromptsContext.Provider>
    )
}
