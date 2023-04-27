import { getLikesViewsPurchasesAndRank } from '@/utils/apis'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const UserInfoContainer = ({ currentChat }: any) => {
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
        <div className='w-1/2 flex flex-col align-middle justify-center p-5 gap-3' >
            <div className="purchaseInfo ">
                @{currentChat?.username} has not purchased any prompts from you.
            </div>
            <div className="is-eligible">
                You are currently not eligible to accept custom prompt job payments. Read our FAQ page for more information.
            </div>
            <hr />
            <div className="avatar-image  flex justify-center">
                <img className=' rounded-full border-white border-8 w-[100px] h-[100px] '
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
