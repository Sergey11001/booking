import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {PlacesActions} from "../redux/places/actions";
import PlaceItem from "./PlaceItem";

const MyAccommodation = () => {
    const dispatch = useDispatch()
    const {places} = useSelector(state => state.placesReducer)

    useEffect(() => {
        dispatch(PlacesActions.fetchAllPlaces())
    }, [])

    return (
        <div className="text-center">
            <Link to='/account/places/new'
                  className="inline-flex bg-primary text-white py-2 px-6 rounded-full mt-6 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Add new place
            </Link>
            <div className="text-left mt-4">
                {
                    places.map(place => (
                        <PlaceItem key={place._id} title={place.title} address={place.address} id={place._id} photos={place.photos} />
                    ))
                }
            </div>

        </div>
    );
};

export default MyAccommodation;