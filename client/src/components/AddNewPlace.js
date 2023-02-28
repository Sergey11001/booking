import React, {useEffect, useState} from 'react';
import PhotosUpload from "./PhotosUpload";
import Perks from "./Perks";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {PlacesActions} from "../redux/places/actions";

const AddNewPlace = () => {
    const {changedPlace} = useSelector(state => state.placesReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [placeForm, setPlaceForm] = useState({
        title: "",
        address: '',
        photos: [],
        description: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 1,
    })
    //чтобы не отправлять в компоненту Perks весь state placeForm
    const [perks, setPerks] = useState([])

    const addNewPlace = (e) => {
        e.preventDefault()
        if(changedPlace){
            //В placeForm есть id кого обновлять
            axios.put('/places/' +  changedPlace.id, {...placeForm, perks}).then(()=> {
                navigate('/account/places')
            }).catch(() => {
                alert("Check form")
            })
        }
        else{
            axios.post('/places', {...placeForm, perks}).then(()=> {
                navigate('/account/places')
            }).catch(() => {
                alert("Check form")
            })
        }

    }
    useEffect(() => {
        window.scroll(0,0)
        if(changedPlace){
            const {perks:perksData, ...dataPlace} = changedPlace
            setPlaceForm(dataPlace)
            setPerks(perksData)
        }
        return () => dispatch(PlacesActions.setChangedPlace(null))
    },[])

    return (
        <div>
            <form onSubmit={addNewPlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="accent-gray-400">Title should be shorter</p>
                <input value={placeForm.title}
                       onChange={(e) => setPlaceForm({...placeForm, title: e.target.value})} type="text"
                       placeholder="Title: my lovely apartments"/>
                <h2 className="text-2xl mt-4">Address</h2>
                <input value={placeForm.address}
                       onChange={(e) => setPlaceForm({...placeForm, address: e.target.value})}
                       type="text"
                       placeholder="Address"
                />

                <PhotosUpload placeForm={placeForm} setPlaceForm={setPlaceForm} />

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="accent-gray-400">Description of the place</p>
                <textarea
                    value={placeForm.description}
                    onChange={(e) => setPlaceForm({...placeForm, description: e.target.value})}
                    className="resize-none h-36"
                />

                <h2 className="text-2xl my-4">Perks</h2>
                <Perks selected={perks} onChange = {setPerks} />

                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="accent-gray-400">house rules etc.</p>
                <textarea
                    value={placeForm.extraInfo}
                    onChange={(e) => setPlaceForm({...placeForm, extraInfo: e.target.value})}
                    className="resize-none h-36"
                />
                <h2 className="text-2xl mt-4">Check in&out times</h2>
                <p className="accent-gray-400">add check in and out times</p>
                <div className="grid sm: grid-cols-3 gap-5 mt-5">
                    <div>
                        <h3 className="mb-3 text-lg">Check in time</h3>
                        <input
                            value={placeForm.checkIn}
                            onChange={(e) => setPlaceForm({...placeForm, checkIn: e.target.value})}
                            type="text"
                            placeholder="12:00"
                        />
                    </div>
                    <div>
                        <h3 className="mb-3 text-lg">Check out time</h3>
                        <input
                            value={placeForm.checkOut}
                            onChange={(e) => setPlaceForm({...placeForm, checkOut: e.target.value})}
                            type="text"
                            placeholder="13:00"/>
                    </div>
                    <div>
                        <h3 className="mb-3 text-lg">Number of the guests</h3>
                        <input
                            value={placeForm.maxGuests}
                            onChange={(e) => setPlaceForm({...placeForm, maxGuests: Number(e.target.value)})}
                            type="number"
                            placeholder={'0'}
                        />
                    </div>
                </div>
                <button className="bg-primary my-4 text-white py-2 px-20 rounded-full text-xl">{changedPlace ? 'Upload' : 'Save'}</button>
            </form>
        </div>
    );
};

export default AddNewPlace;