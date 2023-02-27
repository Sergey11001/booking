import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const {user} = useSelector(state => state.userReducer)
    console.log(user)
    return (
        <header className='flex justify-between'>
            <Link to='/' className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-10 h-10 ">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
                </svg>
                <span className='font-bold text-xl'>Booking</span>
            </Link>
            <div className="flex items-center py-2 px-3 border border-gray-200 rounded-full gap-3 font-medium">
                <div>
                    Anywhere
                </div>
                <div className="border-l border-gray-300 h-full"></div>
                <div>
                    Any week
                </div>
                <div className="border-l border-gray-300 h-full"></div>
                <div>
                    Any guests
                </div>
                <button className="bg-primary text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>
                </button>
            </div>
            <div className="flex items-center py-2 px-3 border border-gray-200 rounded-full gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
                </svg>
                <Link to={user ? '/account' : '/login'}
                      className="bg-gray-500 text-white rounded-full p-1 border border-gray-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-6 h-6 relative top-1.5">
                        <path fillRule="evenodd"
                              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                              clipRule="evenodd"/>
                    </svg>
                </Link>
                {
                    user &&
                    <div className="font-medium text-lg pr-2">{user.name}</div>
                }
            </div>
        </header>
    );
};

export default Header;