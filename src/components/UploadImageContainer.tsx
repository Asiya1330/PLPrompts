import React from 'react'

export default function UploadImageContainer({ file, handleDelete }: any) {

    const removeFile = async () => {
        handleDelete(file.name)
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
                    }}>x</div>
            <img className='writeImg'
                style={{
                    "maxWidth": "100px",
                    "minHeight": "100px",
                }}
                src={URL.createObjectURL(file)} alt="" />
        </div>
    )
}
