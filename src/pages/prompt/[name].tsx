//@ts-nocheck
import { Router, useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PromptsContext } from '@/contexts/PromptsContext';
import { UserContext } from '@/contexts/UserContext';
import { GetPromptFavByUserId, GetPromptViewsByUserId, InsertLikePromptUrl, InsertViewPromptUrl, getUserById, markFeatureUrl } from '@/utils/apis';
import axios from 'axios';
import Link from 'next/link';
import { isAdmin } from '@/lib/auth';

export default function SinglePrompt() {

    const [prompt, setPrompt] = useState();
    const { currentUser } = useContext(UserContext);
    const [promptUser, setPromptUser] = useState();
    // const [isFeature, setIsFeature] = useState();
    const router = useRouter();
    const { prompts, setPrompts, setFeaturedPrompts, featuredPrompts } = useContext(PromptsContext);
    const [isClicked, setIsClicked] = useState(false);
    const heartImageRef = useRef()

    const { name } = router.query;

    useEffect(() => {
        const addPromptViews = async () => {
            if (currentUser?._id && prompt && prompt._id) {
                const { data } = await axios.get(`${GetPromptViewsByUserId}/${currentUser._id}/${prompt._id}`)
                if (!data.length) {
                    await axios.post(InsertViewPromptUrl, {
                        viewerId: currentUser._id,
                        promptId: prompt._id
                    })
                }
            }
        }
        addPromptViews()
    }, [currentUser, prompt])

    useEffect(() => {
        if (prompts) {
            const [promptVal] = prompts.filter(prompt => prompt.name === name);
            setPrompt(promptVal);
        }
    }, [name, prompts])

    useEffect(() => {
        const getUser = async () => {
            if (prompt) {
                const { data } = await axios.get(`${getUserById}/${prompt.userId}`);
                if (data) {
                    setPromptUser(data)
                }
            }
        }
        getUser();
    }, [name, prompt])

    const handleMarkFav = async () => {
        if (!isClicked) {
            setIsClicked(true);
            if (currentUser._id && prompt && prompt._id) {
                heartImageRef.current.style.borderRadius = '50%';
                heartImageRef.current.style.background = 'red';

                const { data } = await axios.get(`${GetPromptFavByUserId}/${currentUser._id}/${prompt._id}`);
                console.log(data, ';like daa');

                if (!data.length) {
                    await axios.post(InsertLikePromptUrl, {
                        likerId: currentUser._id,
                        promptId: prompt._id
                    })
                }
            }
        }
    }
    const handleMarkFeature = async () => {
        if (prompt && prompt._id) {
            const { data } = await axios.post(markFeatureUrl, { _id: prompt._id });
            if (data.modifiedCount === 1) {
                const updatedPrompt = { ...prompt, isFeature: true }
                const updatedPrompts = prompts.map(item => (item._id === prompt._id) ? { ...item, isFeature: true } : item);
                setPrompt(updatedPrompt);
                setPrompts(updatedPrompts);
                setFeaturedPrompts([...featuredPrompts, updatedPrompt])
            }
        }

    }
    const handleOwnerProfile = () => {
        console.log(promptUser);
        if (promptUser && promptUser?.username)
            router.push({
                pathname: `/public-profile/${promptUser.username}`,
                query: { publicProfileOwner: JSON.stringify(promptUser) }
            }, `/public-profile/${promptUser.username}`);
    }

    if (!promptUser) return <div>Loading...</div>
    else return (
        <div className='m-10 gap-1 flex flex-row'>
            {(!prompt) ? 'Loading...'
                :
                <>
                    <div className="leftSide w-[60%] m-5">
                        <div className="headerImage mb-5">
                            <img src={prompt.images[0]} alt="" className='min-w-full max-h-[245px]' />
                        </div>
                        <div className="promptName ">
                            <p className='text-5xl  relative text-start mb-5'>

                                {prompt.name} <span className='text-xl text-gray-500 cursor-pointer' title='edit title'></span>
                            </p>
                            {
                                (currentUser._id === prompt.userId) &&
                                <button>Edit prompt &#x270E;</button>
                            }
                            {
                                isAdmin(currentUser) && !prompt?.isFeature &&
                                <button className='mark-feature' onClick={handleMarkFeature}>Mark Feature</button>
                            }
                        </div>
                        <div className="promptInfo flex align-middle flex-row w-full justify-between">
                            <div className="owner-seller flex align-middle flex-row gap-5">

                                <div className="sellerStats flex align-middle flex-row" title='seller stats'>
                                    <img src="/icons/tag.svg" alt="" className=' w-[17px] mr-[5px]' /> <span>{prompt.purchaseCount ? prompt.purchaseCount : 0}</span>
                                </div>
                                <div className="promptOwner cursor-pointer bg-white rounded text-black p-2" onClick={handleOwnerProfile}>
                                    {promptUser?.username || 'user'}
                                </div>

                            </div>
                            <div className="rate-view-favs flex align-middle flex-row gap-5">
                                <div className="rating">
                                    {prompt.rating ? prompt.rating : 'no ratings'}
                                </div>
                                <div className="views flex align-middle flex-row" title='views'>
                                    <img src="/icons/eye.svg" alt="" className=' w-[17px] mr-2' /><span>{prompt.views}</span>
                                </div>
                                <button className="favs p-0 border-none flex flex-row align-middle justify-center" title='mark as favourites' onClick={handleMarkFav} disabled={isClicked} >
                                    <img ref={heartImageRef} src="/icons/heart.svg" alt="" style={{ color: "white" }} className=' mr-2' />
                                    <span>{prompt.likes}</span>
                                </button>
                            </div>
                        </div>
                        <hr className='mb-5 mt-5' />

                        <div className="description mb-5">
                            {prompt.description}
                        </div>
                        <div className="price mb-5">
                            <span className='text-3xl'>{prompt.price}</span>
                        </div>
                        <Link href={{ pathname: '/payment', query: { amount: prompt.price, promptId: prompt._id } }}>
                            <button className='getPrompt'>
                                Get Prompt
                            </button>
                        </Link>
                        <p className='flex justify-start mt-3'>{prompt.createdAt}</p>

                    </div>
                    <div className="rightSide mt-5 w-[42%]">
                        <div className="imagesCont h-[100vh] flex flex-col overflow-auto">
                            {
                                prompt.images.map((image) => {
                                    return <img src={image} alt="" className='max-w-full max-h-full block' />
                                })
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
