import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useParams} from "react-router-dom";
import {UserActions} from "../redux/user/actions";
import PlacesPage from "./PlacesPage";
import NavAccount from "../components/NavAccount";

const Account = () => {
    const {user} = useSelector(state => state.userReducer)
    const {subpage} = useParams()
    const dispatch = useDispatch()

    if(!user){
        return <Navigate to="/" />
    }

    const handleLogout = () => {
        dispatch(UserActions.logoutUser())
    }

    return (
        <div>
            <NavAccount subpage={subpage}/>
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