import React from 'react';
import { useState } from 'react';
import { AuthProvider } from '../../api/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideImage from '../../images/Airis-Johnson.jpg'

export const Login = () => {
    const [username, setUsename] = useState("")
    const [password, setPassword] = useState("")
    const naviagate = useNavigate();
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === "password") {
            setPassword(value)
        }
        if (name === "username") {
            setUsename(value)
        }
    }
    const login = () => {
        console.log("On login")
        AuthProvider.login(username, password).then(() => {
            console.log("Login successful")
            console.log("Navigating to /")
            window.location = "/"
        })
    }
    return (
        <div className='flex flex-col w-screen h-screen'>
            <nav className='p-3 absolute top-0 left-0 w-full flex flex-row justify-between items-center'>
                <h1 className='text-4xl'>የእናት ጓዳ</h1>
                <div className='flex flex-row gap-2 text-black md:text-white'>
                    <Link to="/register-customer" >Register as customer</Link>
                    <Link to="/register-provider" >Register as provider</Link>
                </div>
            </nav>
            <div className='h-full flex-grow  grid sm:grid-cols-1 md:grid-cols-2 grid-rows-1 md:items-center '>
                <main className='py-14 md:py-0'>
                    <form className='p-3 flex flex-col gap-4 max-w-sm m-auto md:m-4' >
                        <h1 className='text-4xl'>Login</h1>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" >Username</label>
                            <input type="text" name='username' value={username} onChange={handleInputChange} className='flex-grow border rounded p-1' id="email" required />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label htmlFor="password" >Password</label>
                            <input type="password" name='password' value={password} onChange={handleInputChange} className='flex-grow border rounded p-1' id="password" required autoComplete='password' />
                        </div>
                        <button type="button" onClick={login} className="bg-orange-500 text-white rounded p-1 text-lg">Login</button>
                    </form>
                </main>
                <div className='hidden md:flex h-full w-full'>
                    <img className='h-full w-full object-cover' src={SideImage} alt='logo' />
                </div>
            </div>
        </div >
    );
};