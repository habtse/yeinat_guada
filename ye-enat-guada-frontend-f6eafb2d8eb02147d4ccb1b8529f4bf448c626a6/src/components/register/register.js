import React from 'react';
import { useState } from 'react';
import { AuthProvider } from '../../api/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SideImage from '../../images/Airis-Johnson.jpg'


export const RegisterAsCustomer = () => {
    const [registrationInfo, setRegistrationInfo] = useState({})
    const naviagate = useNavigate();
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setRegistrationInfo({ ...registrationInfo, [name]: value });
    }
    const register = () => {
        console.log("On register as customer", registrationInfo)
        AuthProvider.registerAsCustomer(registrationInfo).then(
            () => {
                console.log("Registered as customer")
                naviagate("/login")
            }
        ).catch(err => {
            console.log(err)
        }
        )
    }
    const onFileChange = event => {
        // Update the state
        setRegistrationInfo({ ...registrationInfo, image: event.target.files[0] });
    };
    return (
        <div className='flex flex-col w-screen h-screen'>
            <nav className='p-3 absolute top-0 left-0 w-full flex flex-row justify-between items-center'>
                <h1 className='text-4xl'>የእናት ጓዳ</h1>
                <div className='flex flex-row gap-2 text-black md:text-white'>
                    <Link to="/login" >Login</Link>
                    <Link to="/register-provider" >Register as provider</Link>
                </div>
            </nav>
            <div className='h-full flex-grow  grid sm:grid-cols-1 md:grid-cols-2 grid-rows-1 md:items-center '>
                <main className='py-14 md:py-0'>
                    <form className='p-3 flex flex-col gap-4 max-w-sm m-auto md:m-4' >
                        <h1 className='text-4xl'>Register Customer</h1>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="firstName" >First Name</label>
                            <input type="text" name='firstname' value={registrationInfo.firstname} onChange={handleInputChange} className='flex-grow border rounded p-1' id="firstName" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="lastName" >Last Name</label>
                            <input type="text" name='lastname' value={registrationInfo.lastname} onChange={handleInputChange} className='flex-grow border rounded p-1' id="lastName" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" >User Name</label>
                            <input type="text" name='username' value={registrationInfo.username} onChange={handleInputChange} className='flex-grow border rounded p-1' id="username" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phoneNumber" >Phone Number</label>
                            <input type="tel" name='phone_number' value={registrationInfo.phone_number} onChange={handleInputChange} className='flex-grow border rounded p-1' id="phoneNumber" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" >Email</label>
                            <input type="email" name='email' value={registrationInfo.email} onChange={handleInputChange} className='flex-grow border rounded p-1' id="email" />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label htmlFor="password" >Password</label>
                            <input type="password" name='password' value={registrationInfo.password} onChange={handleInputChange} className='flex-grow border rounded p-1' id="password" />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label htmlFor="image" >Profile Picture</label>
                            <input accept="image/jpeg,image/png,image/gif" type="file" name='image' className='flex-grow border rounded p-1' id="profilePicture" onChange={onFileChange} />
                        </div>
                        <button type="button" onClick={register} className="bg-orange-500 text-white rounded p-1 text-lg">Register</button>
                    </form>
                </main>
                <div className='hidden md:flex h-full w-full'>
                    <img className='h-full w-full object-cover' src={SideImage} alt='logo' />
                </div>
            </div>
        </div >
    );
};


export const RegisterAsProvider = () => {
    const [registrationInfo, setRegistrationInfo] = useState({ lat: 0, long: 0 })
    const naviagate = useNavigate();
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setRegistrationInfo({ ...registrationInfo, [name]: value });
    }
    const register = () => {
        console.log("On register as provider", registrationInfo)
        AuthProvider.registerAsProvider(registrationInfo).then(
            () => {
                console.log("Registered as provider")
                naviagate("/login")
            }).catch(err => {
                console.log(err)
            }
            )
    }
    const onFileChange = event => {
        // Update the state
        setRegistrationInfo({ ...registrationInfo, image: event.target.files[0] });
    };
    return (
        <div className='flex flex-col w-screen h-screen'>
            <nav className='p-3 absolute top-0 left-0 w-full flex flex-row justify-between items-center'>
                <h1 className='text-4xl'>የእናት ጓዳ</h1>
                <div className='flex flex-row gap-2 text-black md:text-white'>
                    <Link to="/login">Login</Link>
                    <Link to="/register-customer">Register as customer</Link>
                </div>
            </nav>
            <div className='h-full flex-grow  grid sm:grid-cols-1 md:grid-cols-2 grid-rows-1 md:items-center '>
                <main className='py-14 md:py-0'>
                    <form className='p-3 flex flex-col gap-4 max-w-sm m-auto md:m-4' >
                        <h1 className='text-4xl'>Register Provider</h1>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="firstName" >First Name</label>
                            <input type="text" name='firstname' value={registrationInfo.firstname} onChange={handleInputChange} className='flex-grow border rounded p-1' id="firstName" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="lastName" >Last Name</label>
                            <input type="text" name='lastname' value={registrationInfo.lastname} onChange={handleInputChange} className='flex-grow border rounded p-1' id="lastName" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" >User Name</label>
                            <input type="text" name='username' value={registrationInfo.username} onChange={handleInputChange} className='flex-grow border rounded p-1' id="username" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phoneNumber" >Phone Number</label>
                            <input type="tel" name='phone_number' value={registrationInfo.phone_number} onChange={handleInputChange} className='flex-grow border rounded p-1' id="phoneNumber" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" >Email</label>
                            <input type="email" name='email' value={registrationInfo.email} onChange={handleInputChange} className='flex-grow border rounded p-1' id="email" />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label htmlFor="password" >Password</label>
                            <input type="password" name='password' value={registrationInfo.password} onChange={handleInputChange} className='flex-grow border rounded p-1' id="password" />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label htmlFor="image" >Profile Picture</label>
                            <input accept="image/jpeg,image/png,image/gif" type="file" name='image' className='flex-grow border rounded p-1' id="profilePicture" onChange={onFileChange} />
                        </div>
                        <button type="button" onClick={register} className="bg-orange-500 text-white rounded p-1 text-lg">Register</button>
                    </form>
                </main>
                <div className='hidden md:flex h-full w-full'>
                    <img className='h-full w-full object-cover' src={SideImage} alt='logo' />
                </div>
            </div>
        </div >
    );
};