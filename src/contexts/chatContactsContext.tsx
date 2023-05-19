//@ts-nocheck

import React, { useContext, useState, useEffect } from 'react'
import { createContext } from 'react'
import { UserContext } from './UserContext';
import axios from 'axios';
import { getChatUrl } from '@/utils/apis';

export const ChatContactsContext = createContext({
    contacts: [],
    setContacts: () => null
})
const ChatContactsProvider = ({ children }: any) => {
    const [contacts, setContacts] = useState([]);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchchats = async () => {
            if (currentUser && currentUser?._id) {
                const { data } = await axios.get(getChatUrl, {
                    params: {
                        userId: currentUser?._id
                    }
                })
                const updatedContact = data.map((chat) => chat.chat_users[0])
                setContacts(updatedContact)
            }
        }
        fetchchats()
    }, [currentUser])

    const value = { contacts, setContacts }
    return (
        <ChatContactsContext.Provider value={value}>
            {children}
        </ChatContactsContext.Provider>
    )
}

export default ChatContactsProvider
