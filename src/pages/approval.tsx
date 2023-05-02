import React, { useContext, useEffect, useState } from 'react'
import { isAdmin } from '../lib/auth';
import { UserContext } from '../contexts/UserContext'
import axios from 'axios';
import PromptCard from '@/components/PromptCard';
import { approvePromptUrl, getNonApprovedAllPromptsUrl } from '@/utils/apis';
import { PromptsContext } from '@/contexts/PromptsContext';
import PromptCardExt from '@/components/PromptCardExt';

const Approval = () => {
    const { currentUser } = useContext(UserContext);
    const { unapprovedPrompts, setUnapprovedPrompts } = useContext(PromptsContext);
    // const [releaseHour, setReleaseHour] = useState();

    const handleApprovePrompt = async (id: any, timeInHour: any, selectedCategories: any) => {
        const { data } = await axios.post(approvePromptUrl, { id, timeInHour, selectedCategories });
        console.log(data);

        if (data) {
            const updated = unapprovedPrompts.filter(prompt => prompt._id !== id);
            setUnapprovedPrompts(updated);
        }
    }

    if (currentUser?._id && !isAdmin(currentUser)) {
        return <p>Access Denied</p>;
    }
    return (
        <div className='approval-page flex flex-col gap-5 m-10'>
            <div className="approval-time-range">

            </div>
            { //@ts-ignore
                unapprovedPrompts.length ? unapprovedPrompts?.map(({ _id, name, price, type, images, status, description }: any, idx: number) => (
                    <PromptCardExt idx={_id} key={_id} name={name} price={price} type={type} images={images} status={status} description={description} handleApprovePrompt={handleApprovePrompt} />
                )) : <div className="noprndingPrompts">
                    No Pending Prompts
                </div>
            }
        </div>
    );
}

export default Approval
