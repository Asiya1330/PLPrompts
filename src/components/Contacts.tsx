import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";

export default function Contacts({ contacts, changeChat }:any) {
  const router = useRouter();
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const { currentUser } = useContext(UserContext);
  console.log(contacts, 'inside contact');

  useEffect(() => {
    const getSessionasync = async () => {
      if (!currentUser) router.push('/login')
    }
    getSessionasync();
  }, []);

  const changeCurrentChat = (index: any, contact: string) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <div className="contacts-container">
        <div className="inMail">
          InMail
        </div>
        <div className="search-box-chat">
          <span className="icon"><img src="./icons/search.svg" alt="" /></span>
          <input type="text" className="input" placeholder="Search" />
        </div>

        <div className="contacts">
          {contacts.map((contact: any, index: any) => {
            return (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  {
                    contact.avatarImage ?
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      /> :
                      <img src="./avatars/avatar1.png" alt="" />
                  }
                </div>
                <div className="username">
                  <p>{contact.username}</p>
                  <div>@ronald</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
