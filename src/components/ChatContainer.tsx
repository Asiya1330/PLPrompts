//@ts-nocheck
import React, { useState, useEffect, useRef, useContext, ChangeEvent } from "react";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute, SendEmailToChatUrl } from "../utils/apis";
import Picker from 'emoji-picker-react'
import { UserContext } from "@/contexts/UserContext";
import { ResposnsivenessContext } from "@/contexts/responsiveWidthContext";

export default function ChatContainer({ currentChat, socket, isOpenContacts, setIsOpenContacts, isOpenContactInfo, setIsOpenContactInfo }: any) {
    const { currentUser } = useContext(UserContext)
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [loading, setLoading] = useState(false)
    const { chatBreakPoint, removeSiteName } = useContext(ResposnsivenessContext)

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event: any, emojiObject: any) => {
        let message = msg;
        message += event.emoji;
        setMsg(message);
    };

    const sendChat = (event: ChangeEvent) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };


    useEffect(() => {
        const asyncsetMessages = async () => {
            const data = currentUser;
            const response = await axios.post(recieveMessageRoute, {
                from: data._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        asyncsetMessages()
    }, [currentChat]);

    const handleSendMsg = async (msg: any) => {
        setLoading(true)
        let data = currentUser;
        await axios.post(SendEmailToChatUrl, {
            chat: currentChat,
            sender: currentUser,
            message: msg
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg,
        });


        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
        setLoading(false)
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chats-container">
            <div className="chat-header">
                <div className="user-details justify-between w-full">
                    <div className="flex flex-row justify-center items-center gap-2">
                        {chatBreakPoint &&
                            <div className="" onClick={() => setIsOpenContacts(!isOpenContacts)}>
                                <i className="fa fa-comments text-3xl text-slate-950"></i>
                            </div>
                        }
                        <div className="avatar">
                            {currentChat.avatarImage ?
                                <img
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt=""
                                /> :
                                <img src="./avatars/avatar2.png" alt="" />
                            }
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                    {chatBreakPoint &&
                        <div className="contact-info" onClick={() => setIsOpenContactInfo(!isOpenContactInfo)}>
                            <i className="fa fa-user-circle text-slate-900 text-3xl"></i>
                        </div>
                    }
                </div>
            </div>
            {loading ? <div className="flex flex-row items-end justify-center h-[80%]">Loading...</div> :
                <div className="chat-messages">
                    {messages.map((message, idx) => {
                        return (
                            <div ref={scrollRef} key={idx}>
                                <div
                                    className={`message ${message.fromSelf ? "sended" : "recieved"
                                        }`}
                                >
                                    <div className="avatar">
                                        <img src="./avatars/avatar1.png" alt="" />
                                    </div>
                                    <div className="content ">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
            <div className="input-container">
                <form className="input-form " onSubmit={(event) => sendChat(event)}>

                    <input
                        className={` ${!removeSiteName ? 'w-20' : ""}`}
                        type="text"
                        placeholder="Type Here!"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                    />
                    <div className="button-emoji">
                        <div className="emoji-selector" onClick={handleEmojiPickerhideShow}>
                            <div className="smily-container">
                                <img src="./icons/emoti.svg" alt="" />
                            </div>
                        </div>
                        {!removeSiteName ?
                            <button type="submit"
                                className={`w-8 p-2 bg-transparent `}>
                                <span className="text-white"><img src="./icons/send.svg" alt="" /></span>
                            </button> :
                            <button type="submit"
                                className={``}>
                                <> <span className=""><img src="./icons/send.svg" alt="" /></span> Send</>
                            </button>
                        }
                    </div>
                </form>
            </div>
            <div className="emoji-picker-pop-up">
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
        </div>
    );
}
