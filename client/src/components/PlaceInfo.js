import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Perks from "./Perks";
import SwiperPhotos from "./SwiperPhotos";
import {useDispatch} from "react-redux";
import {PlacesActions} from "../redux/places/actions";

const PlaceInfo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {action:id} = useParams()
    const [placeData, setPlaceData] = useState({})

    const handleChangeInfo = () => {
        dispatch(PlacesActions.setChangedPlace({...placeData, id}))
        navigate('/account/places/update')
    }

    useEffect(() => {
        axios.get('/places/'+id).then(({data}) => setPlaceData(data))
    },[])

    return (
        <div>
            <h1 className='text-4xl mt-4 font-bold'>
                {placeData.title}
            </h1>
            <h2 className='text-2xl mt-1 text-gray-600'>{placeData.address}</h2>
            <SwiperPhotos photos={placeData.photos}/>
            <h3 className='text-2xl mt-3 text-gray-500'>Description:</h3>
            <p className="text-lg mt-1 ">{placeData.description}</p>
            <h3 className='text-2xl mt-3 mb-2 text-gray-500'>Perks:</h3>
            <Perks selected={placeData.perks} onChange={() => {}}></Perks>
            <h3 className='text-2xl mt-3 text-gray-500'>Extra information:</h3>
            <p className="text-lg mt-1 ">{placeData.extraInfo}</p>
            <h3 className='text-2xl mt-2 mb-2 text-gray-500 mt-3'>Check in&out times:</h3>
            <div className="flex gap-2 text-white mt-2 mb-10">
                <div className='bg-primary rounded-2xl p-5 flex flex-col justify-center items-center'>
                    <h4 className='text-xl'>Check in:</h4>
                    <p  className='text-lg'>{placeData.checkIn}</p>
                </div>
                <div className='bg-primary rounded-2xl p-5 flex flex-col justify-center items-center'>
                    <h4 className='text-xl'>Check out:</h4>
                    <p className='text-lg'>{placeData.checkOut}</p>
                </div>
                <div className='bg-primary rounded-2xl p-5 flex flex-col justify-center items-center'>
                    <h4 className='text-xl'>Max guests:</h4>
                    <p className='text-lg'>{placeData.maxGuests}</p>
                </div>
            </div>
            <button className="bg-gray-400 px-6 py-2 text-lg font-bold mb-5 text-white rounded-2xl" onClick={handleChangeInfo}>Update information</button>
        </div>
    );
};

export default PlaceInfo;