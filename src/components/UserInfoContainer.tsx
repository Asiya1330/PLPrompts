import { getLikesViewsPurchasesAndRank } from '@/utils/apis'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const UserInfoContainer = ({ currentChat, isOpenContactInfo, setIsOpenContactInfo }: any) => {
    const router = useRouter();
    const [selectedChatUserInfo, setSelectedChatUserInfo] = useState({});

    useEffect(() => {
        const selectedChatInfo = async () => {
            if (currentChat && currentChat?.username) {
                const { data } = await axios.get(`${getLikesViewsPurchasesAndRank}?ownername=${currentChat?.username}`)
                console.log(data);
                setSelectedChatUserInfo(data[0])
            }
        }
        selectedChatInfo();
    }, [currentChat])

    const handleBuyCustom = () => null
    const moveToUserProfile = () => {
        router.push(`public-profile/${currentChat?.username}`)
    }
    return (

        <div 
        style={{ boxShadow: 'rgba(27, 27, 27, 0.57) -1px 2px 5px 4px' }}
        className={`absolute top-30 h-auto w-64 bg-[#222236] transition-transform duration-300 transform ${!isOpenContactInfo ? 'translate-x-full right-[-30%]' : 'translate-x-0 right-0'} w-1/2 flex flex-col align-middle justify-center p-5 gap-3`} >
            <div className="cross mx-auto" onClick={() => setIsOpenContactInfo(false)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>

            </div>
            <div className="purchaseInfo ">

                @{currentChat?.username} has not purchased any prompts from you.
            </div>
            <div className="is-eligible">
                You are currently not eligible to accept custom prompt job payments. Read our FAQ page for more information.
            </div>
            <hr />
            <div className="avatar-image  flex justify-center">
                <img className=' rounded-full border-white border-[8px] w-[100%] h-[100%] '
                    src={currentChat?.avatarImage ? currentChat?.avatarImage : "avatars/avatar2.png"} />
            </div>
            <div className="username text-center">

                @{currentChat?.username}
            </div>
            <div className="description text-center">
                {currentChat?.description ?
                    currentChat?.description : 'no description set'
                }
            </div>
            <div className="views-purchase flex flex-row justify-center gap-2">
                <div className="views flex flex-row align-middle justify-center gap-2">
                    <img src="/icons/eye.svg" alt="" />{selectedChatUserInfo?.totalViews}
                </div>
                <div className="purchase flex align-middle justify-center flex-row gap-2">
                    <img src="/icons/tag.svg" alt="" />{selectedChatUserInfo?.totalPurchases}
                </div>
            </div>

            <div className="rank text-center">PromptBase Rank: #{selectedChatUserInfo?.promptBaseRank}</div>

            <div className="joiningDate text-center">
                Joined:{(selectedChatUserInfo?.createdAt && new Date(selectedChatUserInfo?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })) ??
                    new Date(selectedChatUserInfo?.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
            </div>
            <button className='text-[13px] p-[10px] m-auto hover:bg-slate-400' onClick={handleBuyCustom}>
                Buy Custom Prompt
            </button>
            <div className="customPrompts text-center">
                @{currentChat?.username} charges $49.99/ custom prompt.

            </div>
            <button className='text-[13px] p-[10px] m-auto hover:bg-slate-400' onClick={moveToUserProfile}>
                View Profile
            </button>

        </div>
    )
}

export default UserInfoContainer
