import React, { useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardExt = ({ name, price, images, idx, type, description, handleApprovePrompt }: any) => {
    const [releaseHour, setReleaseHour] = useState();

    const hourChangeHandler = (e: any) => {
        const hour = e.target.value;
        if (hour <= 10)
            setReleaseHour(hour);
    }

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (category) => {
        if (!selectedCategories.includes(category))
            setSelectedCategories([...selectedCategories, category]);
        else {
            const updatedCats = selectedCategories.filter(item => item !== category)
            setSelectedCategories(updatedCats)
        }
    };

    const categories = [
        "3D",
        "Accessory",
        "Animal",
        "Anime",
        "Avatar",
        "Building",
        "Cartoon",
        "Clothes",
        "Cute",
        "Drawing",
        "Fantasy",
        "Food",
        "Future",
        "Games",
        "Graphic Design",
        "Icons",
        "Jewelry",
        "Landscape",
        "Logo",
        "Mockup",
        "Monogram",
        "Nature",
        "NSFW",
        "Pattern",
        "People",
        "Photography",
        "Pixel Art",
        "Product",
        "Psychedelic",
        "Scary",
        "Space",
        "Synthwave",
        "Unique Style",
        "Vehicle",
        "Wallpaper",
    ];


    return (
        <div className='flex flex-row gap-3 justify-evenly'>
            <PromptCard clickable={false} name={name} price={price} tag={type} image={images.length ? images[0] : null} />
            <div className='details w-[60%] flex flex-col align-middle justify-evenly border-gray-300 border-2 p-5 rounded'>
                <div>
                    <h1>Details:</h1>
                    {description}
                </div>
                <div className="button flex gap-5">
                    <button className='hover:bg-gray-400' onClick={() => handleApprovePrompt(idx, releaseHour, selectedCategories)}> Approve</button>
                    <button className='hover:bg-gray-400'> Decline</button>
                    <input className='w-1/4 p-5' placeholder='Release After...' type="number" name="" id="" min={1} max={10} style={{ color: "black" }} value={releaseHour} onChange={hourChangeHandler} />
                </div>
                <br /><br />
                <div className="add-cats flex flex-row flex-wrap">
                    <h1 className='mb-4'>Select Categories From Below</h1> <hr className='w-full' />
                    {categories.map((category) => (

                        <div className={`${(selectedCategories.includes(category)) ? 'bg-slate-400' : ''} cursor-pointer flex m-2 p-2 flex-row align-middle justify-center rounded-full border-2 border-white gap-2 `} key={category} onClick={() => handleCategoryClick(category)}>

                            <span>{category}</span>
                            {selectedCategories.includes(category)
                                ? <span>-</span> : <span>+</span>
                            }
                        </div>

                    ))}
                    <hr className='w-full mt-5' />
                    <p>Selected categories: {selectedCategories.join(", ")}</p>

                </div>
            </div>
        </div >
    )
}

export default PromptCardExt
