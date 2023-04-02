import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react';
import moduleName from '../'
import { TAG_IMAGE_MAP } from '@/helpers/constants';
import { Tag } from '@/helpers/interface';
import { PromptsContext } from '@/contexts/PromptsContext';
import User from '@/supabase/User';
import { UserContext } from '@/contexts/UserContext';

export default function SinglePrompt() {
    const [prompt, setPrompt] = useState();
    const { currentUser } = useContext(UserContext);
    const [promptUser, setPromptUser] = useState();
    const router = useRouter();
    const { prompts } = useContext(PromptsContext);
    console.log(prompts);

    const { name } = router.query;

    useEffect(() => {
        if (prompts) {
            const [promptVal] = prompts.filter(prompt => prompt.name === name);
            setPrompt(promptVal);
        }
    }, [name, prompts])

    useEffect(() => {

        const getUser = async () => {
            if (prompt) {
                const [user] = await User.findUserById(prompt.userId);
                setPromptUser(user)
            }
        }

        getUser();
    }, [name, prompt])

    const typeDesc = {
        [Tag.midjourney]: 'After purchasing, you will gain access to the prompt file, which you can use with Midjourney. You must already have access to Midjourney to use this prompt.',
        [Tag.gpt3]: 'After purchasing, you will gain access to the prompt file, which you can use with ChatGPT. You must already have access to ChatGPT to use this prompt.',
        [Tag.promptbase]: `After purchasing, you will gain access to the prompt file, which you can use in <Link href='/generate'>PromptBase Generate</Link>`,
        [Tag.dalle]: 'After purchasing, you will gain access to the prompt file, which you can use within DALL·E with your own credits. You must already have access to DALL·E to use this prompt.',
        [Tag.diffusion]: 'After purchasing, you will gain access to the prompt file, which you can use with DreamStudio.        '
    }
    console.log(prompt);

    return (
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
                                (currentUser.id === prompt.userId) &&
                                <button>Edit prompt &#x270E;</button>
                            }
                        </div>
                        <div className="promptInfo flex align-middle flex-row w-full justify-between">
                            <div className="owner-seller flex align-middle flex-row gap-5">

                                <div className="sellerStats flex align-middle flex-row" title='seller stats'>
                                    <img src="/icons/tag.svg" alt="" className=' w-[17px] mr-[5px]' /> <span>0</span>
                                </div>
                                <div className="promptOwner">
                                    {promptUser?.username || 'user'}
                                </div>

                            </div>
                            <div className="rate-view-favs flex align-middle align-middle flex-row gap-5">
                                <div className="rating">
                                    {prompt.rating ? prompt.rating : 'no ratings'}
                                </div>
                                <div className="views flex align-middle flex-row" title='views'>
                                    <img src="/icons/eye.svg" alt="" className=' w-[17px] mr-2' /><span>{prompt.views}0</span>
                                </div>
                                <div className="favs" title='mark as favourites'>
                                    <img src="/icons/heart.svg" alt="" style={{ color: "white" }} />
                                    {/* {prompt.fav} */}
                                </div>
                            </div>
                        </div>
                        <hr className='mb-5 mt-5' />

                        <div className="description mb-5">
                            {prompt.description}
                        </div>
                        <div className="price mb-5">
                            <span className='text-3xl'>{prompt.price}</span>
                        </div>
                        <button className='getPrompt'>
                            Get Prompt
                        </button>
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
