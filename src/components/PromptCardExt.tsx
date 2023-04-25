import React, { useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardExt = ({ name, price, images, idx, type, description, handleApprovePrompt }: any) => {
    const [releaseHour, setReleaseHour] = useState();

    const hourChangeHandler = (e: any) => {
        const hour = e.target.value;
        if (hour <= 10)
            setReleaseHour(hour);
    }

    return (
        <div className='flex flex-row gap-3 justify-evenly'>
            <PromptCard clickable={false} name={name} price={price} tag={type} image={images.length ? images[0] : null} />
            <div className='details w-[60%] flex flex-col align-middle justify-evenly border-gray-300 border-2 p-5 rounded'>
                <div>
                    <h1>Details:</h1>
                    {description}
                </div>
                <div className="button flex gap-5">
                    <button className='hover:bg-gray-400' onClick={() => handleApprovePrompt(idx, releaseHour)}> Approve</button>
                    <button className='hover:bg-gray-400'> Decline</button>
                    <input type="number" name="" id="" min={1} max={10} style={{ color: "black" }} value={releaseHour} onChange={hourChangeHandler} />
                </div>
            </div>
        </div>
    )
}

export default PromptCardExt
