import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
import PhotosUpload from "../components/PhotosUpload";

const PlacesPage = () => {
    const {action} = useParams()
    const navigate = useNavigate()
    const [errorForm, setErrorForm] = useState()
    const [placeForm, setPlaceForm] = useState({
        title: "",
        address: '',
        addedPhotos: [],
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
        axios.post('/places', {...placeForm, perks}).then(()=> navigate('/account/places')).catch(() => {
            alert("Check form")
        })

    }

    return (
        <div>
            {
                action !== 'new' &&
                <div className="text-center">
                    <Link to='/account/places/new'
                          className="inline-flex bg-primary text-white py-2 px-6 rounded-full mt-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add new place
                    </Link>
                </div>
            }
            {
                action === "new" && (
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
                            <button className="bg-primary my-4 text-white py-2 px-20 rounded-full text-xl">Save</button>
                        </form>
                    </div>
                )
            }

        </div>

    );
};

export default PlacesPage;