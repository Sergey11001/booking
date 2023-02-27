import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPage = () => {
    const {action} = useParams()
    const [photoErrorLink, setPhotoErrorLink] = useState(false)
    const [placeForm, setPlaceForm] = useState({
        title: "",
        address: '',
        addedPhotos: [],
        photoLink: '',
        description: '',
        perks: [],
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 1,
    })
    const addPhotoByLink = (e) => {
        e.preventDefault()
        axios.post('/upload-by-link', {
            link: placeForm.photoLink
        })
            .then(({data:filename}) => {
                setPhotoErrorLink(false)
                setPlaceForm({...placeForm, photoLink: '', addedPhotos: [...placeForm.addedPhotos, filename]})
            })
            .catch(() => {
                setPhotoErrorLink(true)
            })
    }

    const removeErrorOnFocus = () => {
        setPhotoErrorLink(false)
    }

    const uploadPhoto = (e) => {
        const files = e.target.files
        const data = new FormData()
        for (let i=0; i<files.length;i++){
            data.append('photos', files[i])
        }
        axios.post('/upload', data, {
            headers: {'Content-type': "multipart/form-data"}
        }).then(({data:filenames}) => {
            setPlaceForm({...placeForm, addedPhotos: [...placeForm.addedPhotos, ...filenames]})
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
                        <form>
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="accent-gray-400">Title should be shorter</p>
                            <input value={placeForm.title}
                                   onChange={(e) => setPlaceForm({...placeForm, title: e.target.value})} type="text"
                                   placeholder="Title: my lovely apartments"/>
                            <h2 className="text-2xl mt-4">Address</h2>
                            <input value={placeForm.address}
                                   onChange={(e) => setPlaceForm({...placeForm, address: e.target.value})} type="text"
                                   placeholder="Address"/>
                            <h2 className="text-2xl mt-4">Photos</h2>
                            {
                                photoErrorLink &&
                                <p className='text-red-600 text-xs'>Wrong photo link</p>
                            }
                            <div className="flex gap-3">
                                <input
                                    onFocus={removeErrorOnFocus}
                                    value={placeForm.photoLink}
                                    onChange={(e) => setPlaceForm({...placeForm, photoLink: e.target.value})}
                                    type="text"
                                    placeholder="Add using link"
                                />
                                <button className="bg-gray-400 px-4 w-fit rounded-2xl"
                                        onClick={addPhotoByLink}>Add&nbsp;photo
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 mt-4 ">
                                {
                                    placeForm.addedPhotos.length > 0 &&
                                    placeForm.addedPhotos.map(link => {
                                        return <div>
                                            <img className="rounded-2xl h-full" src={"http://localhost:3333/uploads/" + link} alt=""/>
                                        </div>
                                    })
                                }
                                <label className="flex flex-col items-center cursor-pointer justify-center text-lg gap-2 p-6 border block w-full rounded-2xl border-2">
                                    <input multiple type="file" className="hidden" onChange={uploadPhoto}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                                    </svg>
                                    Upload
                                </label>
                            </div>
                            <h2 className="text-2xl mt-4">Description</h2>
                            <p className="accent-gray-400">Description of the place</p>
                            <textarea
                                value={placeForm.description}
                                onChange={(e) => setPlaceForm({...placeForm, description: e.target.value})}
                                className="resize-none h-36"
                            />
                            <Perks/>
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