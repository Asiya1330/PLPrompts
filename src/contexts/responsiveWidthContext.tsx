//@ts-nocheck
import React, { useEffect, createContext, useState } from 'react';

export const ResposnsivenessContext = createContext({
    showBurgerMenu: false,
    setshowBurgerMenu: () => null,
    removeSocialIcons: false,
    setRemoveSocialIcons: () => null,
    removeSiteName: false,
    setRemoveSiteName: () => null,
    chatBreakPoint: false,
    setChatBreakPoint: () => null,
    profileBreakPoint: false,
    setProfileBreakPoint: () => null, 
})

const ResposnsivenessProvider = ({ children }) => {
    const [showBurgerMenu, setshowBurgerMenu] = useState(false);
    const [removeSocialIcons, setRemoveSocialIcons] = useState(false);
    const [removeSiteName, setRemoveSiteName] = useState(false);
    const [chatBreakPoint, setChatBreakPoint] = useState(false);
    const [profileBreakPoint, setProfileBreakPoint] = useState(false);



    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_BEAPI,
            process.env.NEXT_PUBLIC_LOCALHOST_KEY,
            process.env.REMOTE_URL, process.env.JWT_SECRET,
            process.env.NEXT_PUBLIC_EXPRESS_ACCOUNT_LINK, 'hehe2 vars');

        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 950) setRemoveSocialIcons(true)
            else setRemoveSocialIcons(false)

            if (width >= 820) setshowBurgerMenu(false)
            else setshowBurgerMenu(true)

            if (width >= 420) setRemoveSiteName(true)
            else setRemoveSiteName(false)

            if (width >= 730) setChatBreakPoint(false)
            else setChatBreakPoint(true)

            if (width >= 520) setProfileBreakPoint(false)
            else setProfileBreakPoint(true)
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const value = {
        showBurgerMenu,
        setshowBurgerMenu,
        removeSocialIcons,
        setRemoveSocialIcons,
        removeSiteName, setRemoveSiteName,
        chatBreakPoint, setChatBreakPoint,
        setProfileBreakPoint, profileBreakPoint
    }
    return (
        <ResposnsivenessContext.Provider value={value}>
            {children}
        </ResposnsivenessContext.Provider>
    );
};

export default ResposnsivenessProvider;
