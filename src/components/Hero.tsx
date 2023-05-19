//@ts-nocheck
import PromptCard from '@/components/PromptCard';
import { PromptsContext } from '@/contexts/PromptsContext';
import { UserContext } from '@/contexts/UserContext';
import { ChatContactsContext } from '@/contexts/chatContactsContext';
import { ResposnsivenessContext } from '@/contexts/responsiveWidthContext';
import { addChatUrl } from '@/utils/apis';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

export default function Hero() {

  const { prompts } = useContext(PromptsContext)
  const { chatBreakPoint } = useContext(ResposnsivenessContext)
  const [fourHighestScoredPrompt, setFourHighestScoredPrompt] = useState();
  const { currentUser } = useContext(UserContext)
  const { setContacts } = useContext(ChatContactsContext)
  const router = useRouter();

  useEffect(() => {
    if (prompts) {
      const hightsMid = prompts.reduce((acc, prompt) => {
        if (!acc[prompt.type] || acc[prompt.type].totalSum < prompt.totalSum)
          acc[prompt.type] = prompt
        return acc
      }, {})
      console.log(fourHighestScoredPrompt, 'dessdx');

      setFourHighestScoredPrompt(hightsMid)
    }
  }, [prompts])

  const handleSendToSeller = async () => {
    if (fourHighestScoredPrompt?.['PromptBase']?.userId !== currentUser?._id) {
      const { data } = await axios.post(addChatUrl, {
        userId: currentUser?._id,
        chatId: fourHighestScoredPrompt?.['PromptBase']?.userId,
      })
      const updatedContacts = data.map((item: any) => {
        item = item['chat_users'][0];
        return item
      })
      setContacts(updatedContacts)

      router.push('/chat')
    }
  }

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="flex flex-col gap-y-32">
        {!chatBreakPoint &&
          <>
            <PromptCard
              price={fourHighestScoredPrompt?.['GPT']?.price}
              key={fourHighestScoredPrompt?.['GPT']?.name}
              name={fourHighestScoredPrompt?.['GPT']?.name}
              tag={fourHighestScoredPrompt?.['GPT']?.type}
              image={fourHighestScoredPrompt?.['GPT']?.images?.length ? fourHighestScoredPrompt['GPT']?.images[0] : ''}
            />
            <PromptCard
              price={fourHighestScoredPrompt?.['Midjourney']?.price}
              key={fourHighestScoredPrompt?.['Midjourney']?.name}
              name={fourHighestScoredPrompt?.['Midjourney']?.name}
              tag={fourHighestScoredPrompt?.['Midjourney']?.type}
              image={fourHighestScoredPrompt?.['Midjourney']?.images?.length ? fourHighestScoredPrompt['Midjourney']?.images[0] : ''}
            />
          </>
        }
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="py-10 gradient-text">Expert prompts marketplace</h2>
        <div className="flex flex-col bg-white rounded-lg px-3 py-4 max-w-[270px] h-fit justify-center items-center mt-4">
          <img src={fourHighestScoredPrompt?.['PromptBase']?.images[0] ? fourHighestScoredPrompt?.['PromptBase']?.images[0] : '/hire/avatar-diffusion2 - Copy.png'} width="220" height="215" alt="freePrompt" />
          <p className="text-black text-2xl font-bold text-center pt-4">{fourHighestScoredPrompt?.['PromptBase']?.name}</p>
          <h2 className="text-black font-bold my-4">$0.00</h2>
          {/* <Link href={{ pathname: '/payment', query: { amount: '0', promptId: fourHighestScoredPrompt?.['PromptBase']?._id } }}> */}
          <button onClick={handleSendToSeller} className='getPrompt bg-[#F3848A] my-6 py-3 px-12 rouned-full text-black
            font-semibold border-2 border-black hover:bg-slate-700 transition duration-200 ease-in-out"'>
            Free Prompt
          </button>
          {/* </Link> */}

          <div className="flex flex-row pt-4 gap-4">
            <div className="border-[1px] text-black border-gray-400 w-fit h-fit rounded-lg flex flex-col px-4 py-2 justify-center items-center">
              <h3 className="">22</h3>
              <p className=" text-sm">Hours</p>
            </div>
            <div className="border-[1px] text-black border-gray-400 w-fit h-fit rounded-lg flex flex-col px-4 py-2 justify-center items-center">
              <h3 className="">58</h3>
              <p className=" text-sm">Min</p>
            </div>
            <div className="border-[1px] text-black border-gray-400 w-fit h-fit rounded-lg flex flex-col px-4 py-2 justify-center items-center">
              <h3 className="">16</h3>
              <p className=" text-sm">Sec</p>
            </div>
          </div>
        </div>
        <h2 className="text-center pt-10">
          <span className="gradient-text">Professionally hand-picked prompts for</span> ChatGPT, Midjourney, Dall-e,
          Stable diffusion
        </h2>
      </div>
      <div className="flex flex-col gap-y-32">
        {!chatBreakPoint &&
          <>
            <PromptCard
              price={fourHighestScoredPrompt?.['DALL-E']?.price}
              key={fourHighestScoredPrompt?.['DALL-E']?.name}
              name={fourHighestScoredPrompt?.['DALL-E']?.name}
              tag={fourHighestScoredPrompt?.['DALL-E']?.type}
              image={fourHighestScoredPrompt?.['DALL-E']?.images?.length ? fourHighestScoredPrompt?.['DALL-E']?.images[0] : ''}
            />
            <div className="ml-10">
              <PromptCard
                price={fourHighestScoredPrompt?.['Stable Diffusion']?.price}
                key={fourHighestScoredPrompt?.['Stable Diffusion']?.name}
                name={fourHighestScoredPrompt?.['Stable Diffusion']?.name}
                tag={fourHighestScoredPrompt?.['Stable Diffusion']?.type}
                image={fourHighestScoredPrompt?.['Stable Diffusion']?.images?.length ? fourHighestScoredPrompt['Stable Diffusion']?.images[0] : ''}
              />
            </div>
          </>
        }
      </div>
    </div>
  );
}
