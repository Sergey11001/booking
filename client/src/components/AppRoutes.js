import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../utils/routes";
import {useSelector} from "react-redux";

const AppRoutes = () => {
    const {isAuth} = useSelector(state => state.userReducer)
    return (
        <Routes>
            {
                isAuth &&
                privateRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))
            }
            {
                publicRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))
            }
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    );
};

export default AppRoutes;