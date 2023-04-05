import React, { useContext, useEffect, useState } from 'react'
import { isAdmin } from '../lib/auth';
import { UserContext } from '../contexts/UserContext'
import axios from 'axios';
import PromptCard from '@/components/PromptCard';
import { approvePromptUrl, getNonApprovedAllPromptsUrl } from '@/utils/apis';
import { PromptsContext } from '@/contexts/PromptsContext';

const Approval = () => {
    const { currentUser } = useContext(UserContext);
    const { unapprovedPrompts, setUnapprovedPrompts } = useContext(PromptsContext);


    const handleApprovePrompt = async (id: any) => {
        const promptApproved = await axios.post(approvePromptUrl, { id });
        console.log(promptApproved);

        if (promptApproved?.data?.modifiedCount == 1) {
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
                    <div className='flex flex-row gap-3 justify-evenly'>
                        <PromptCard clickable={false} key={idx} name={name} price={price} tag={type} image={images.length ? images[0] : null} />
                        <div className='details w-[60%] flex flex-col align-middle justify-evenly border-gray-300 border-2 p-5 rounded'>
                            <div>
                                <h1>Details:</h1>
                                {description}
                            </div>
                            <div className="button flex gap-5">
                                <button className='hover:bg-gray-400' onClick={() => handleApprovePrompt(_id)}> Approve</button>
                                <button className='hover:bg-gray-400'> Decline</button>
                            </div>
                        </div>
                    </div>
                )) : <div className="noprndingPrompts">
                    No Pending Prompts
                </div>
            }
        </div>
    );
}

export default Approval
