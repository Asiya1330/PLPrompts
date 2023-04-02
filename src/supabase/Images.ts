import supabase from '../utils/supabase';

const BUCKET_NAME = process.env.NEXT_PUBLIC_UPLOAD_BUCKET;
const env = process.env.NEXT_PUBLIC_ENV
const org = process.env.NEXT_PUBLIC_ORG

async function uploadImageToFolder(file, userId) {
    if (!file || !userId || !BUCKET_NAME || !env || !org) return

    const filename = `${org}-${env}-${userId}/${Date.now()}-${file.name}`
    const { data, error } = await supabase
        .storage
        .from(BUCKET_NAME)
        .upload(filename, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        console.log(error, 'lol')
        return null
    }
    return data;
}

// Function to retrieve all images in a folder based on an ID
async function getImagesInFolder(folderId) {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(`${folderId}/`)
    if (error) {
        console.log(error)
        return null
    }
    return data;
}

const deleteObjectsWithPath = async (path: any) => {
    try {
        console.log(path, BUCKET_NAME);
        const { data, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .remove([path])


        if (error) {
            throw error;
        }
        console.log('Deleted objects:', data);
    } catch (error) {
        console.error('Error deleting objects:', error.message);
    }
};

export default { uploadImageToFolder, getImagesInFolder, deleteObjectsWithPath };
