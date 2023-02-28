import React from 'react';
import {Link, useParams} from "react-router-dom";

const NavAccount = ({subpage}) => {
    const linkClasses = (type) => {
        return type===(subpage || "profile") ? 'py-2 px-6 bg-primary text-white rounded-full' : 'py-2 px-6'
    }
    return (
        <nav className="w-full flex gap-2 mt-8 justify-center items-center">
            <Link to="/account/" className={linkClasses('profile')}>My profile</Link>
            <Link to="/account/bookings" className={linkClasses('bookings')}>My bookings</Link>
            <Link to="/account/places" className={linkClasses('places')}>My accommodation</Link>
        </nav>
    );
};

export default NavAccount;