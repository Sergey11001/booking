import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useParams} from "react-router-dom";
import {UserActions} from "../redux/user/actions";
import PlacesPage from "./PlacesPage";

const Account = () => {
    const {user} = useSelector(state => state.userReducer)
    const {subpage} = useParams()
    const dispatch = useDispatch()

    if(!user){
        return <Navigate to="/" />
    }

    const linkClasses = (type=null) => {
        return type===(subpage || "profile") ? 'py-2 px-6 bg-primary text-white rounded-full' : 'py-2 px-6'
    }

    const handleLogout = () => {
        dispatch(UserActions.logoutUser())
    }

    return (
        <div>
            <nav className="w-full flex gap-2 mt-8 justify-center items-center">
                <Link to="/account/" className={linkClasses('profile')}>My profile</Link>
                <Link to="/account/bookings" className={linkClasses('bookings')}>My bookings</Link>
                <Link to="/account/places" className={linkClasses('places')}>My accommodation</Link>
            </nav>
            {
                !subpage && (
                    <div className="text-center max-w-lg mx-auto mt-8 text-xl">
                        Logged in as {user.name} ({user.email})<br />
                        <button className="mt-2 bg-primary text-white text-lg w-full rounded-full py-1" onClick={handleLogout}>Logout</button>
                    </div>
                )
            }
            {
                subpage==="places" && (
                    <PlacesPage />
                )
            }
        </div>
    );
};

export default Account;