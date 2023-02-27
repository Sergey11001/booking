import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        axios.post("/register", registerForm).catch(err => console.log(err.response.data.message))
    }

    return (
        <div className="mt-10">
            <h2 className="text-center font-medium text-4xl mb-8">Register</h2>
            <form action="" onSubmit={handleRegisterSubmit} className='flex flex-col items-center justify-center w-2/5 border rounded-2xl p-5 border-gray-400 m-auto'>
                <input
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                    type="text"
                    placeholder="Name"
                />
                <input
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    type="password"
                    placeholder="Password"
                />
                <button className="w-1/3 min-w-fit mt-3 bg-primary text-white px-6 py-1 border rounded-xl self-start font-medium text-lg">
                    Register
                </button>
                <div className="mt-1 self-start">
                    Already has an account?
                    <Link to="/login" className="underline ml-2">Login now</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;