import type { NextPage } from 'next';
import { io } from "socket.io-client";
import React, { useState, useRef, useEffect, RefObject, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { allUsersRoute, host } from '../../utils/apis'
import Contacts from '@/components/Contacts';
import Welcome from '@/components/Welcome';
import ChatContainer from '@/components/ChatContainer';

const Chat: NextPage = () => {
  const socket = useRef();

  //****** */
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  console.log(contacts, 'contavt');


  useEffect(() => {
    if (currentUser) {
      //@ts-ignore
      socket.current = io(host);
      //@ts-ignore
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


  useEffect(() => {
    const setContactHandler = async () => {
      console.log(currentUser);
      //@ts-ignore
      if (currentUser?._id) {
        //@ts-ignore
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
      else {
        console.log('id does not exist on currentUser');
      }
    }
    setContactHandler();
  }, [currentUser]);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };

  return (
    <div className="container-chat-system">
      <Contacts contacts={contacts} changeChat={handleChatChange} />

      {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContainer currentChat={currentChat} socket={socket} />
      )}
    </div>
  );
}

export default Chat

