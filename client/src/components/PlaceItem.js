import React from 'react';
import {Link} from "react-router-dom";

const PlaceItem = ({id, address, title, photos}) => {
    return (
        <Link to={'/account/places/' + id} className="bg-gray-200 gap-3 p-4 rounded-2xl flex cursor-pointer mb-5">
            <div className='w-40 h-32 rounded-2xl overflow-hidden shrink-0'>
                {
                   photos.length > 0 &&
                    <img src={'http://localhost:3333/uploads/' + photos[0]} className="object-cover w-full h-full" alt="photo"/>
                }
            </div>
            <div className="grow-0 shrink">
                <h2 className="text-xl">{title}</h2>
                <p className="text-lg text-gray-700 mt-2">{address}</p>
            </div>
        </Link>
    );
};

export default PlaceItem;