//@ts-nocheck
import React, { useState, useEffect, useRef, useContext, ChangeEvent } from "react";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/apis";
import Picker from 'emoji-picker-react'
import { UserContext } from "@/contexts/UserContext";

export default function ChatContainer({ currentChat, socket }: any) {
    const { currentUser } = useContext(UserContext)
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event: any, emojiObject: any) => {
        console.log(event, emojiObject, 'lll');

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

    const handleSendMsg = async (msg:any) => {
        let data = currentUser;
        console.log(currentUser, 'cindkj');
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
                <div className="user-details">
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
            </div>
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
            <div className="input-container">
                <form className="input-form" onSubmit={(event) => sendChat(event)}>

                    <input
                        type="text"
                        placeholder="type your message here"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                    />
                    <div className="button-emoji">
                        <div className="emoji-selector" onClick={handleEmojiPickerhideShow}>
                            <div className="smily-container">
                                <img src="./icons/emoti.svg" alt="" />
                            </div>
                        </div>
                        <button type="submit">
                            <span><img src="./icons/send.svg" alt="" /></span> Send
                        </button>
                    </div>
                </form>
            </div>
            <div className="emoji-picker-pop-up">
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
        </div>
    );
}