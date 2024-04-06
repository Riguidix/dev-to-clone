import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Button from "../components/Button";

// TODO: Add submit on enter

function Label_Input({ id, value, label, setValue, type }) {
    return (
        <div className='mb-2 w-full'>
            <label htmlFor={ id }>
                { label }
            </label>

            <input
                id={ id }
                className='bg-white border border-slate-300 focus:border-sky-400 mt-1 focus:outline-none px-3 py-2 focus:ring-1 focus:ring-sky-500 rounded-md shadow-sm text-md w-full'
                value={ value }
                onChange={ setValue }
                type={ type }
                />
        </div>
    );
}

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    function handleRegister () {
        if (username !== '' && email !== '' && password !== '' && passwordConfirmation !== '') {
            if (password === passwordConfirmation) {
                let user = {
                    username,
                    email,
                    password
                }

                axios.post('http://localhost:3000/api/users/', user)
                    .then(response => {
                        if (response.data.success && response.status) {
                            navigate('/signIn');
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            alert (error.response.data.message);
                        }
                    });
            }
        }
    }
    
    const inputs = [
        {
            id: 'username_input',
            value: username,
            label: 'Username',
            setValue: (event) => setUsername(event.target.value),
            type: 'text'
        },
        {
            id: 'email_input',
            value: email,
            label: 'Email',
            setValue: (event) => setEmail(event.target.value),
            type: 'email'
        },
        {
            id: 'password_input',
            value: password,
            label: 'Password',
            setValue: (event) => setPassword(event.target.value),
            type: 'password'
        },
        {
            id: 'password_confirmation_input',
            value: passwordConfirmation,
            label: 'Password Confirmation',
            setValue: (event) => setPasswordConfirmation(event.target.value),
            type: 'password'
        },
    ];

    return (
        <div className='flex flex-wrap h-3/6 items-center justify-center p-5 shadow w-5/6 md:w-2/3 lg:w-1/3'>
            <div className='w-full'>
                <h1 className='font-bold text-xl'>
                    Create account
                </h1>
            </div>

            <div className='w-full'>
                {
                    inputs.map((input, index) => {
                        return (
                            <div key={ index } >
                                <Label_Input
                                    id={ input.id }
                                    value={ input.value }
                                    label={ input.label }
                                    setValue={ input.setValue }
                                    type={ input.type }
                                />
                            </div>
                        );
                    })
                }
            </div>

            <div className='w-1/3'>
                <Button
                    style='bg-blue-700 hover:bg-blue-800 ease-in-out px-5 py-2 rounded text-white transition w-full'
                    title='Sign Up'
                    action={ handleRegister }
                />
            </div>
        </div>
    );
}
