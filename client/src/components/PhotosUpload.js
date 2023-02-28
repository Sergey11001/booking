import React, {useState} from 'react';
import axios from "axios";

const PhotosUpload = ({placeForm, setPlaceForm}) => {
    const [photoErrorLink, setPhotoErrorLink] = useState(false)
    const [photoLink, setPhotoLink] = useState('')
    const addPhotoByLink = (e) => {
        e.preventDefault()
        axios.post('/upload-by-link', {
            link: photoLink
        })
            .then(({data:filename}) => {
                setPhotoErrorLink(false)
                setPlaceForm({...placeForm, photos: [...placeForm.photos, filename]})
                setPhotoLink('')
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
            setPlaceForm({...placeForm, photos: [...placeForm.photos, ...filenames]})
        })
    }

    return (
        <div>
            <h2 className="text-2xl mt-4">Photos</h2>
            {
                photoErrorLink &&
                <p className='text-red-600 text-xs'>Wrong photo link</p>
            }
            <div className="flex gap-3">
                <input
                    onFocus={removeErrorOnFocus}
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    type="text"
                    placeholder="Add using link"
                />
                <button className="bg-primary text-white px-4 w-fit rounded-2xl"
                        onClick={addPhotoByLink}>Add&nbsp;photo
                </button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 mt-4 ">
                {
                    placeForm.photos.length > 0 &&
                    placeForm.photos.map(link => {
                        return <div key={link}>
                            <img className="rounded-2xl h-full object-cover" src={"http://localhost:3333/uploads/" + link} alt=""/>
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
        </div>
    );
};

export default PhotosUpload;