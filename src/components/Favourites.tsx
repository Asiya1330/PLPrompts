import React from 'react'

export default function Favourites() {
  return (
    <div className='flex gap-4 flex-col'>
            <h1 className='' style={{
                fontSize:"30px",
                fontWeight: "bold",
                // margin:"20px"
            }}>
                Favourites
            </h1>
            <hr />
            <div>
                No results found
            </div>
        </div>
  )
}
