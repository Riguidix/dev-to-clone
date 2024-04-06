import { useState } from "react";
import axios from 'axios';

import Button from "../Button";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin () {
        if (email !== '' && password !== '') {
            let user = {
                username: email,
                password
            }

            axios.post('http://localhost:3000/api/users/login', user)
                .then(response => {
                    if (response.data.token && response.data.success) {
                        localStorage.setItem('token', response.data.token);

                        axios.get(`http://localhost:3000/api/users/${ response.data.data }`)
                            .then(response => {
                                let user = {
                                    email: response.data.data.email,
                                    username: response.data.data.username,
                                    id: response.data.data._id,
                                    profilePicture: response.data.data.profilePicture
                                }
                                
                                localStorage.setItem('user', JSON.stringify(user));
                            })
                            .catch(error => console.error('find user:', error));
                    }
                })
                .catch(error => console.error('login user:', error));
        }
    }

    return (
        <div className='flex items-center flex-col justify-start w-full'>
            <div className='mb-5 w-full'>
                <div className='w-full'>
                    <label htmlFor='email_input'>Email</label>
                    <input
                        id='email_input'
                        className='bg-white border border-slate-300 focus:border-sky-400 mt-1 focus:outline-none px-3 py-2 focus:ring-1 focus:ring-sky-500 rounded-md shadow-sm text-md w-full'
                        value={ email }
                        onChange={ (event) => setEmail(event.target.value) }
                        type='text'
                    />
                </div>

                <div className='w-full'>
                    <label htmlFor='password_input'>Password</label>
                    <input
                        id='password_input'
                        className='bg-white border border-slate-300 focus:border-sky-400 mt-1 focus:outline-none px-3 py-2 focus:ring-1 focus:ring-sky-500 rounded-md shadow-sm text-md w-full'
                        value={ password }
                        onChange={ (event) => setPassword(event.target.value) }
                        type='password'
                    />
                </div>
            </div>

            <div className='w-full'>
                <Button
                    style='bg-blue-700 hover:bg-blue-800 ease-in-out px-5 py-2 rounded text-white transition w-full'
                    title='Log In'
                    action={ handleLogin }
                />
            </div>
        </div>
    );
}
