//@ts-nocheck
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PromptsContext } from "@/contexts/PromptsContext";
import { UserContext } from "@/contexts/UserContext";
import { PromptType } from "@/utils/Constants";
import {
  CreateCheckoutSessionUrl,
  GetPromptFavByUserId,
  GetPromptPurchaseByUserId,
  GetPromptViewsByUserId,
  InsertLikePromptUrl,
  InsertPurchasePromptUrl,
  InsertViewPromptUrl,
  PaymentLink,
  getUserById,
  markFeatureUrl,
  updatePrompt,
} from "@/utils/apis";
import axios from "axios";
import { isAdmin } from "@/lib/auth";
import { ResposnsivenessContext } from "@/contexts/responsiveWidthContext";

export default function SinglePrompt() {
  const [prompt, setPrompt] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [promptUser, setPromptUser] = useState();
  // const [isFeature, setIsFeature] = useState();
  const router = useRouter();
  const { prompts, setPrompts, setFeaturedPrompts, featuredPrompts } =
    useContext(PromptsContext);
  const [isClicked, setIsClicked] = useState(false);
  const heartImageRef = useRef();
  const { removeSocialIcons } = useContext(ResposnsivenessContext);
  const { name, amount } = router.query;
  // console.log(router?.query?.amount, "amount");
  useEffect(() => {
    if (router?.query?.amount === "0") {
    }
  }, [router.query]);
  useEffect(() => {
    const addPromptViews = async () => {
      if (currentUser?._id && prompt && prompt._id) {
        const { data } = await axios.get(
          `${GetPromptViewsByUserId}/${currentUser._id}/${prompt._id}`
        );
        if (!data.length) {
          await axios.post(InsertViewPromptUrl, {
            viewerId: currentUser._id,
            promptId: prompt._id,
          });
        }
      }
    };
    addPromptViews();
  }, [currentUser, prompt]);

  useEffect(() => {
    if (prompts) {
      const [promptVal] = prompts.filter((prompt) => prompt.name === name);
      setPrompt(promptVal);
    }
  }, [name, prompts]);

  useEffect(() => {
    const getUser = async () => {
      if (prompt) {
        const { data } = await axios.get(`${getUserById}/${prompt.userId}`);
        if (data) {
          setPromptUser(data);
        }
      }
    };
    getUser();
  }, [name, prompt]);

  const handleMarkFav = async () => {
    if (!isClicked) {
      setIsClicked(true);
      if (!currentUser?._id) alert("You have to login to mark favourite!");
      if (currentUser?._id && prompt && prompt._id) {
        heartImageRef.current.style.borderRadius = "50%";
        heartImageRef.current.style.background = "red";

        const { data } = await axios.get(
          `${GetPromptFavByUserId}/${currentUser._id}/${prompt._id}`
        );
        console.log(data, ";like daa");

        if (!data.length) {
          await axios.post(InsertLikePromptUrl, {
            likerId: currentUser._id,
            promptId: prompt._id,
          });
        }
      }
    }
  };
  const handleMarkFeature = async () => {
    if (prompt && prompt._id) {
      const { data } = await axios.post(markFeatureUrl, { _id: prompt._id });
      if (data.modifiedCount === 1) {
        const updatedPrompt = { ...prompt, isFeature: true };
        const updatedPrompts = prompts.map((item) =>
          item._id === prompt._id ? { ...item, isFeature: true } : item
        );
        setPrompt(updatedPrompt);
        setPrompts(updatedPrompts);
        setFeaturedPrompts([...featuredPrompts, updatedPrompt]);
      }
    }
  };
  const handleOwnerProfile = () => {
    console.log(promptUser);
    if (promptUser && promptUser?.username)
      router.push(
        {
          pathname: `/public-profile/${promptUser.username}`,
          query: { publicProfileOwner: JSON.stringify(promptUser) },
        },
        `/public-profile/${promptUser.username}`
      );
  };

  const handlePayment = async () => {
    if (currentUser && currentUser?._id && prompt && prompt._id) {
      const { data } = await axios.get(
        `${GetPromptPurchaseByUserId}/${currentUser._id}/${prompt._id}`
      );
      console.log(data, "dacd");
      if (data.length) return alert("Prompt already bought by you!");

      if (currentUser?._id !== promptUser?._id) {
        const response = await axios.post(CreateCheckoutSessionUrl, {
          userId: currentUser._id,
          userEmail: currentUser.email,
          userName: currentUser.username,
          stripeCustomerId: currentUser?.stripeCustomerId || null,
          promptProduct: prompt,
        });

        if (response.data.msg) return alert(response.data.msg);
        const { data } = response;
        if (data.stripeCustomerId) {
          setCurrentUser({
            ...currentUser,
            stripeCustomerId: data.stripeCustomerId,
          });
          console.log({
            ...currentUser,
            stripeCustomerId: data.stripeCustomerId,
          });
          localStorage.setItem(
            process.env.NEXT_PUBLIC_LOCALHOST_KEY,
            JSON.stringify({
              ...currentUser,
              stripeCustomerId: data.stripeCustomerId,
            })
          );
        }
        if (data?.url) {
          router.push(data.url);
          console.log(data.url);
        }
      }
    }
  };

  const handleFreePrompt = async () => {
    if (prompt?._id && currentUser._id) {
         const { data } = await axios.get(
        `${GetPromptPurchaseByUserId}/${currentUser._id}/${prompt._id}`
      );
      console.log(data, "dacd");
      if (data.length) return alert("Prompt already bought by you!");

      await axios.post(InsertPurchasePromptUrl, {
        buyerId: currentUser._id,
        promptId: prompt._id,
      });
      alert("Prompt Purchased Successfully");
    }
  };

  if (!promptUser) return <div>Loading...</div>;
  else
    return (
      <div
        className={`${
          !removeSocialIcons ? "flex-col" : "flex-row"
        } sm:m-10 m-3 gap-1 flex `}
      >
        {!prompt ? (
          "Loading..."
        ) : (
          <>
            <div
              className={`${
                !removeSocialIcons
                  ? "w-full items-center flex flex-col"
                  : "w-[60%]"
              } leftSide gap-4`}
            >
              {prompt.type === PromptType.Midjourney ? (
                <div className="headerImage mb-5 bg-fixed flex w-full h-[180px] sm:h-[250px] bg-no-repeat ">
                  <img src={prompt.images[0]} alt="" className="min-w-[35%] " />
                  <img src={prompt.images[1]} alt="" className="min-w-[27%] " />
                  <img src={prompt.images[2]} alt="" className="min-w-[35%]" />
                </div>
              ) : prompt.type !== PromptType.GPT ? (
                <div className="headerImage mb-5 bg-fixed flex w-full h-[180px] sm:h-[250px] bg-no-repeat ">
                  <img
                    src={prompt.images[0]}
                    alt=""
                    className="min-w-[100%] "
                  />
                </div>
              ) : null}

              <div
                className={`${
                  !removeSocialIcons ? "items-center " : "text-start"
                } promptName m-2 flex  flex-col`}
              >
                <p
                  className={`${
                    !removeSocialIcons ? "text-center " : "text-start"
                  } text-5xl  relative mb-5`}
                >
                  {prompt.name}{" "}
                  <span
                    className="text-xl text-gray-500 cursor-pointer"
                    title="edit title"
                  ></span>
                </p>
                {currentUser?._id && currentUser?._id === prompt?.userId && (
                  <button className="button420">Edit prompt &#x270E;</button>
                )}
                {isAdmin(currentUser) && !prompt?.isFeature && (
                  <button
                    className="mark-feature button420"
                    onClick={handleMarkFeature}
                  >
                    Mark Feature
                  </button>
                )}
              </div>
              <div
                className={`${
                  !removeSocialIcons
                    ? "flex-col items-center gap-2"
                    : "flex-row"
                } promptInfo flex align-middle w-full justify-between`}
              >
                <div className="owner-seller flex align-middle flex-row gap-5">
                  <div
                    className="sellerStats flex align-middle flex-row items-center"
                    title="seller stats"
                  >
                    <img
                      src="/icons/tag.svg"
                      alt=""
                      className=" w-[17px] mr-[5px]"
                    />{" "}
                    <span>
                      {prompt.purchaseCount ? prompt.purchaseCount : 0}
                    </span>
                  </div>
                  <div
                    className="promptOwner cursor-pointer bg-white rounded text-black p-2"
                    onClick={handleOwnerProfile}
                  >
                    {promptUser?.username || "user"}
                  </div>
                </div>
                <div className="rate-view-favs flex align-middle flex-row gap-5 items-center">
                  <div className="rating">
                    {prompt.rating ? prompt.rating : "no ratings"}
                  </div>
                  <div
                    className="views flex align-middle flex-row items-center"
                    title="views"
                  >
                    <img
                      src="/icons/eye.svg"
                      alt=""
                      className=" w-[17px] mr-2"
                    />
                    <span>{prompt.views}</span>
                  </div>
                  <button
                    className="favs items-center  p-0 border-none flex flex-row align-middle justify-center"
                    title="mark as favourites"
                    onClick={handleMarkFav}
                    disabled={isClicked}
                  >
                    <img
                      ref={heartImageRef}
                      src="/icons/heart.svg"
                      alt=""
                      style={{ color: "white" }}
                      className=" mr-2"
                    />
                    <span>{prompt.likes}</span>
                  </button>
                </div>
              </div>
              <hr className="mb-5 mt-5 h-[0.2px] w-full bg-white" />

              <div className="description mb-5">{prompt.description}</div>
              <div className="price mb-5">
                <span className="text-3xl">{prompt.price}</span>
              </div>
              {/* <Link href={{ pathname: '/payment', query: { amount: prompt.price, promptId: prompt._id } }}> */}
              {currentUser?._id && currentUser?._id !== promptUser?._id && (
                <button
                  onClick={amount === "0" ? handleFreePrompt : handlePayment}
                  className="getPrompt"
                >
                  Get Prompt
                </button>
              )}
              {!currentUser?._id && <div>Please login to purchase</div>}
              {/* </Link> */}
              <p className="flex justify-start mt-3">{prompt.createdAt}</p>
            </div>
            <div
              className={`${
                !removeSocialIcons ? "w-full" : "w-[42%]"
              } rightSide `}
            >
              <div
                className={`${
                  !removeSocialIcons ? "flex-row" : "flex-col h-[100vh]"
                } imagesCont  flex overflow-auto`}
              >
                {prompt.images.map((image) => {
                  return (
                    <img
                      src={image}
                      alt=""
                      className="max-w-full max-h-full block"
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
}
