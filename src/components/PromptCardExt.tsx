//@ts-nocheck

import React, { useState, useContext } from 'react'
import PromptCard from './PromptCard'
import { ResposnsivenessContext } from '@/contexts/responsiveWidthContext';

const PromptCardExt = ({ name, price, images, idx, type, description, handleApprovePrompt }: any) => {
    const [releaseHour, setReleaseHour] = useState();
    const { removeSiteName, showBurgerMenu } = useContext(ResposnsivenessContext)

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
            <div className='details w-[60%] gap-2 flex flex-col align-middle justify-evenly border-gray-300 border-2 p-5 rounded'>
                <div>
                    <h1>Prompt Description:</h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"&nbsp;{description}&nbsp;"
                </div>
                <div className="button flex gap-5 flex-wrap">
                    <button className='button420 bg-green hover:bg-gray-400' onClick={() => handleApprovePrompt(idx, releaseHour, selectedCategories)}> Approve</button>
                    <button className='button420 hover:bg-gray-400 bg-red'> Decline</button>
                    <div>
                        <input className={`${!showBurgerMenu ? 'w-1/2' : ' w-full'} input420 p-5`} placeholder='Write Release Hour...' type="number" name="" id="" min={1} max={10} style={{ color: "black" }} value={releaseHour} onChange={hourChangeHandler} />
                        <label className='text-sm text-gray-400'> If not provided, then prompt will approve after 1 hour!</label>
                    </div>
                </div>
                <br /><br />
                <div className="add-cats flex flex-row flex-wrap">
                    <h1 className='mb-4'>Select Categories From Below</h1> <hr className='w-full' />
                    {categories.map((category) => (

                        <div className={`${(selectedCategories.includes(category)) ? 'bg-slate-400' : ''} capsule420 cursor-pointer flex m-2 p-2 flex-row align-middle justify-center rounded-full border-2 border-white gap-2 `} key={category} onClick={() => handleCategoryClick(category)}>

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
