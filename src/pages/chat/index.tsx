import type { NextPage } from 'next';
import { io } from "socket.io-client";
import React, { useState, useRef, useEffect, RefObject, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { host } from '../../utils/apis'
import Contacts from '@/components/Contacts';
import Welcome from '@/components/Welcome';
import ChatContainer from '@/components/ChatContainer';
import { ChatContactsContext } from '@/contexts/chatContactsContext';
import UserInfoContainer from '@/components/UserInfoContainer';
import { ResposnsivenessContext } from '@/contexts/responsiveWidthContext';

const Chat: NextPage = () => {
  const socket = useRef();

  const { currentUser } = useContext(UserContext);
  // const [contacts, setContacts] = useState([]);
  const { contacts } = useContext(ChatContactsContext);
  const [currentChat, setCurrentChat] = useState(undefined);
  const { removeSocialIcons, chatBreakPoint } = useContext(ResposnsivenessContext)


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
        // const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        // setContacts(data);
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
  const [isOpenContacts, setIsOpenContacts] = useState(false);
  const [isOpenContactInfo, setIsOpenContactInfo] = useState(false);

  const toggleSidebar = () => {
    setIsOpenContacts(!isOpenContacts);
  };

  return (
    <div className={`${removeSocialIcons ? '' : 'm-0'} container-chat-system`}>

      <Contacts contacts={contacts} changeChat={handleChatChange} isOpenContacts={isOpenContacts} setIsOpenContacts={setIsOpenContacts} />

      {(currentChat === undefined) ? (
        <Welcome isOpenContacts={isOpenContacts} setIsOpenContacts={setIsOpenContacts} />
      ) : (
        <>
          <ChatContainer currentChat={currentChat} socket={socket} isOpenContacts={isOpenContacts} setIsOpenContacts={setIsOpenContacts} isOpenContactInfo={isOpenContactInfo} setIsOpenContactInfo={setIsOpenContactInfo} />
          <UserInfoContainer currentChat={currentChat} isOpenContactInfo={isOpenContactInfo} setIsOpenContactInfo={setIsOpenContactInfo} ></UserInfoContainer>
        </>
      )
      }

    </div>
  );
}

export default Chat

