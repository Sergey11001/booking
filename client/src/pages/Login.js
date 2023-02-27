import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {UserActions} from "../redux/user/actions";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        dispatch(UserActions.loginUser(loginForm))
            .then(() => navigate('/'))
            .catch((err) => alert(err))
    }
    return (
        <div className="mt-10">
            <h2 className="text-center font-medium text-4xl mb-8">Login</h2>
            <form action=""
                  onSubmit={handleLoginSubmit}
                  className='flex flex-col items-center justify-center w-2/5 border rounded-2xl p-5 border-gray-400 m-auto'>
                <input
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    type="password"
                    placeholder="Password"
                />
                <button
                    className="w-1/3 mt-3 bg-primary text-white px-6 py-1 border rounded-xl self-start font-medium text-lg">Login
                </button>
                <div className="mt-1 self-start">
                    Don't have an account?
                    <Link to="/register" className="underline ml-2">Register now</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;