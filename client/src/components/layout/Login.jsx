import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ handleToggle }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleLoginButton () {
        if (email !== '' && password !== '') {
            let user = {
                username: email,
                password
            }

            axios.post('http://localhost:3000/api/users/login', user)
                .then(response => {
                    if (response.data.token && response.data.success) {
                        console.log(response.data);
                        localStorage.setItem('token', response.data.token);
                        navigate('/');
                    }
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className='absolute bg-slate-200 border h-2/3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-lg p-5 w-2/3'>
            <div className='grid grid-rows-12 gap-2 h-full p-5 w-full'>
                <div className='flex items-center justify-end row-span-2'>
                    <Button
                        style='ease-in-out flex h-full hover:bg-gray-300 items-center justify-center p-5 rounded-full text-black transition w-auto'
                        title={ <FontAwesomeIcon icon={ faX } /> }
                        action={ handleToggle }
                    />
                </div>

                <div className='grid grid-rows-2 p-5 row-span-4'>
                    <label className='text-center text-xl' htmlFor='email_input'>Email</label>

                    <input
                        id='email_input'
                        className='h-full p-5 rounded w-full'
                        value={ email }
                        onChange={ (event) => setEmail(event.target.value) }
                        type='text'
                    />
                </div>

                <div className='grid grid-rows-2 p-5 row-span-4'>
                    <label className='text-center text-xl' htmlFor='email_input'>Password</label>

                    <input
                        id='email_input'
                        className='h-full p-5 rounded w-full'
                        value={ password }
                        onChange={ (event) => setPassword(event.target.value) }
                        type='text'
                    />
                </div>

                <div className='flex items-center justify-center row-span-2'>
                    <Button
                        style='bg-gray-400 ease-in-out h-full hover:bg-gray-700 hover:w-3/4 transition-all rounded-xl text-white w-2/3'
                        title='Log In'
                        action={ handleLoginButton }
                    />
                </div>
            </div>
        </div>
    );
}