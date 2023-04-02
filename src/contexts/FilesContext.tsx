import User from '@/supabase/User'
import imageHelperFunctions from '../supabase/Images'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'

export const FilesContext = createContext({
    files: [],
    setFiles: () => null
})

export default function FilesProvider({ children }) {
    const { currentUser } = useContext(UserContext);
    const [files, setFiles] = useState(FilesContext);
    useEffect(() => {
        const getFilesFromBucket = async () => {
            const { data, error } = await imageHelperFunctions.getImagesInFolder(currentUser.id);
            
            setFiles(updatedFiles)

        }
        getFilesFromBucket();

    }, []);

    const value = { files, setFiles }

    return (
        <UserContext.Provider value= { value } >
        { children }
        < /UserContext.Provider>
    )
}
