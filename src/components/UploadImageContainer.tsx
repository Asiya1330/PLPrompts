import React from 'react'
import uploadHelperFunctions from '../supabase/Images'


export default function UploadImageContainer({ file: { url, prefix, path }, handleDelete }: any) {

    const removeFile = async () => {
        await uploadHelperFunctions.deleteObjectsWithPath(path);
        handleDelete(path)
    }

    return (
        <div style={{ position: "relative" }}>
            <div
                onClick={removeFile}
                className="crossIcon"
                style={
                    {
                        position: 'absolute',
                        right: "-6px",
                        top: "-10px",
                        padding: '4px',
                        height: '20px',
                        width: '20px',
                        borderRadius: '100%',
                        background: 'linear-gradient(122deg,#fee5a5,#fea5a5 62%,#f69393 100%,#fff)',
                        zIndex: 2,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        font: "-webkit-mini-control"
                    }}>
                x
                {/* <img src='../../public/icons/cross.svg' alt=""
            style={{
                width: "100%",
                height: "100%"
            }} /> */}
            </div>
            <img className='writeImg'
                style={{
                    "maxWidth": "100px",
                    "minHeight": "100px",
                    // position: "relative"
                }}
                src={url} alt="" />
        </div>
    )
}
