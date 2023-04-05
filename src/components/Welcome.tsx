import React, { useState, useEffect, useContext } from "react";
import Robot from "../../public/icons/robot.gif";
import { UserContext } from "@/contexts/UserContext";

export default function Welcome() {
    const [userName, setUserName] = useState("");

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const setUseNameHandler = async () => {
            //@ts-ignore
            if (currentUser?.username)
                //@ts-ignore
                setUserName(currentUser.username);
        }
        setUseNameHandler();
    }, [currentUser]);

    return (
        <div className="welcome">
            <div className='welcome-div'>
                <h1>
                    Welcome, <span>{userName}!</span>
                </h1>
                <h3>Please select a chat to Start messaging.</h3>
            </div>
        </div>
    );
}
