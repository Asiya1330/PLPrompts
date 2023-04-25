import CustomSwiper from '@/components/CustomSwiper';
import { UserContext } from '@/contexts/UserContext';
import { addChatUrl, addFollowerUrl, getAllPrompts, getLikesViewsPurchasesAndRank } from '@/utils/apis';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext } from 'react'

const PublicProfile = () => {
    const [profileOwner, setProfileOwner] = useState();
    const router = useRouter();
    const { currentUser } = useContext(UserContext);
    const [mostPopular, setMostPopular] = useState();
    const [newest, setNewest] = useState();

    useEffect(() => {
        if (router.isReady) {
            const { publicProfileOwner, username } = router.query;
            console.log(username);

            // if (publicProfileOwner) {
            //     const promptUser = JSON.parse(publicProfileOwner);

            //     setProfileOwner(promptUser)
            // }
            // else{
            const getOwnerMetaData = async () => {
                const { data } = await axios.get(`${getLikesViewsPurchasesAndRank}?ownername=${username}`)
                setProfileOwner(data[0])
            }
            getOwnerMetaData();
        }
        // }
    }, [router.isReady])

    useEffect(() => {
        if (profileOwner?._id) {
            const getpopNewest = async () => {
                const { data } = await axios.get(getAllPrompts, {
                    params: {
                        condition: 'popular-by-id',
                        profileOwnerId: profileOwner?._id
                    }
                })
                setMostPopular(data)

                const newestRes = await axios.get(getAllPrompts, {
                    params: {
                        condition: 'newest-by-id',
                        profileOwnerId: profileOwner?._id
                    }
                })
                setNewest(newestRes.data)
                console.log(newestRes);
            }
            getpopNewest();
        }
    }, [profileOwner])

    const handleFollow = async () => {
        if (profileOwner?._id !== currentUser?._id) {
            const { data } = await axios.post(addFollowerUrl, {
                userId: profileOwner?._id,
                followerId: currentUser?._id
            })
        }
        else alert('You cannot follow yourself')
    }

    const handleMessage = async () => {
        
        if (profileOwner?._id !== currentUser?._id) {
            const {data} = await axios.post(addChatUrl, {
                userId: currentUser?._id,
                chatId: profileOwner?._id,
            })
            console.log(data);
            
            // router.push('/chat')
        }
    }
    const badges = [
        { icon: "⛵", text: "Midjourney" },
        { icon: "🎨", text: " Unique Styles" },
        { icon: "👩", text: "People" },
        { icon: "🦊", text: "Cartoons" },
        { icon: "✏️", text: "Drawing" },
    ]


    return (
        <div className='m-auto'>
            <div className="profile-section w-[1062px] m-5">
                <div className="profile-background-pic">
                    <div className="backgrounf-pic">
                        <img className='w-full h-[195px]' src="https://media.istockphoto.com/id/1323860984/vector/green-background-in-vector-illustration-with-glow-and-lights.jpg?s=612x612&w=0&k=20&c=8IJexeaZOCxSRrNiCCgUvB-dexsy8w9PEF1IF8v4skU=" alt="" />

                    </div>
                    <div className="profile-pic-options flex mt-[-50px] justify-between mr-[20px] ml-[20px]">
                        <img className='w-[100px] h=[100px] rounded-full border-white border-4' src={`${profileOwner?.avatarImage?.length ? profileOwner?.avatarImage : 'https://ionicframework.com/docs/img/demos/avatar.svg'} `} alt="" />
                        <div className="options">
                            <button onClick={handleMessage}>Message <span></span></button>
                            <button onClick={handleFollow}>Follow <span></span></button>

                        </div>
                    </div>
                    <div className="owner-details flex m-3 p-3 flex-col gap-8">
                        <div className="username text-white text-[50px] ">
                            @{profileOwner?.username}
                        </div>
                        <div className="short-desc">
                            {profileOwner?.description ?? ''}
                        </div>
                        <div className="views-likes-purchases-rank-joined_date flex flex-row gap-2 align-middle">
                            <div className="views flex flex-row align-middle justify-center gap-2"><img src="/icons/eye.svg" alt="" />{profileOwner?.totalViews}</div>
                            <div className="likes flex flex-row align-middle justify-center gap-2"><img src="/icons/heart.svg" alt="" />{profileOwner?.totalLikes}</div>
                            <div className="purchase flex align-middle justify-center flex-row gap-2"><img src="/icons/tag.svg" alt="" />{profileOwner?.totalPurchases}</div>
                            <div className="rank flex  align-middle justify-center flex-row gap-2">PromptBase Rank: #{profileOwner?.promptBaseRank}</div>
                            <div className="joinedDate  align-middle justify-center flex flex-row gap-2">Joined: {(profileOwner?.createdAt && new Date(profileOwner?.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })) ??
                                new Date(profileOwner?.updatedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}</div>
                        </div>
                    </div>
                    <div className="badges-containe flex flex-row align-middle justify-start gap-5 ">
                        {badges.map((badge) => {
                            return <div className="badge bg-gray-500 rounded p-1"> <span>{badge.icon}</span> {badge.text}</div>
                        })
                        }

                    </div>
                    <div className="reviews-follwoming-followers flex flex-row align-middle justify-start gap-4 mt-3">
                        <div className="reviews">No reviews yet</div>
                        <div className="follwing">{profileOwner?.following} Following</div>
                        <div className="followers">{profileOwner?.followers} Followers</div>
                    </div>
                    <div className="customcharges mt-5">
                        @{profileOwner?.username} charges $29.99/ custom prompt.
                    </div>
                </div>
                <hr className='mt-10' />
                <div className="most-popular mt-10">
                    {
                        (mostPopular?.length) &&
                        <CustomSwiper title={`Most  Popular Prompts by @${profileOwner?.username}`} data={mostPopular} />
                    }

                </div>
                <hr />
                <div className="newst-by-id mt-10 mb-10">
                    {
                        (newest?.length) &&
                        <CustomSwiper title={`Newest Prompts by @${profileOwner?.username}`} data={newest} />
                    }
                </div>
            </div>
        </div>
    )
}

export default PublicProfile
