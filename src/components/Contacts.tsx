import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { ResposnsivenessContext } from "@/contexts/responsiveWidthContext";

export default function Contacts({ contacts, changeChat, isOpenContacts, setIsOpenContacts }: any) {
  const router = useRouter();
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const { currentUser } = useContext(UserContext);
  const { chatBreakPoint } = useContext(ResposnsivenessContext)

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
      <div
        style={{ boxShadow: '3px 3px 4px rgba(27, 27, 27, 0.57)', height:"calc(100vh - 1.6rem)" }}
        className={` contacts-container  ${chatBreakPoint ? `top-30 z-20  absolute transition-transform duration-300 transform ${isOpenContacts ? 'translate-x-full left-[-70%] w-[70%] ' : 'translate-x-0 w-0 left-0'}` : ``} `}>
        <div className="flex flex-row items-center ">
          {chatBreakPoint &&
            <div className="cross mx-2" onClick={() => setIsOpenContacts(false)}>
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
          }
          <div className="search-box-chat">
            <span className="icon"><img src="./icons/search.svg" alt="" /></span>
            <input type="text" className="input" placeholder="Search" />
          </div>
        </div>

        <div className="contacts">
          {contacts.map((contact: any, index: any) => {
            return (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => {
                  changeCurrentChat(index, contact)
                  setIsOpenContacts(false)
                }}
              >
                <div className="avatar w-8">
                  {
                    contact.avatarImage ?
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      /> :
                      <img src="./avatars/avatar1.png" alt="" />
                  }
                </div>
                <div className="username w-[10vw]">
                  <p className="overflow-hidden overflow-ellipsis">{contact.username}</p>
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
