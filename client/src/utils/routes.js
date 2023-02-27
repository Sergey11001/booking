import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Account";

export const publicRoutes = [
    {
        path: '/',
        element: <Main />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
]

export const privateRoutes = [
    {
        path: '/account/:subpage?',
        element: <Account />
    }
]