import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Button from "../components/Button";

function Label_Input({value, action, label, type }) {
    return (
        <>
            <label
                className='text-xl'
                htmlFor={ value + '_input' }
            >
                { label }
            </label>

            <input
                id={ value + '_input' }
                className='border border-gray-500 h-full p-5 rounded-lg w-full'
                value={ value }
                onChange={ action }
                type={ type }
            />
        </>
    );
}

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const navigate = useNavigate();

    function handleRegisterSubmit (event) {
        if (username !== '' || email !== '' || password !== '' || passwordConfirmation !== '') {
            if (password === passwordConfirmation) {
                let user = {
                    username,
                    email,
                    password
                }
                axios.post('http://localhost:3000/api/users/', user)
                    .then((data) => {
                        if (data.data.success === true && data.status === 200) {
                            navigate('/signIn');
                        } else {
                            alert(data.data.message);
                        }
                    })
                    .catch(error => console.error(error));
            }
        }
    }

    const inputs = [
        {
            value: username,
            action: (event) => setUsername(event.target.value),
            label: 'Username',
            type: 'text'
        },
        {
            value: email,
            action: (event) => setEmail(event.target.value),
            label: 'Email',
            type: 'email'
        },
        {
            value: password,
            action: (event) => setPassword(event.target.value),
            label: 'Password',
            type: 'password'
        },
        {
            value: passwordConfirmation,
            action: (event) => setPasswordConfirmation(event.target.value),
            label: 'Password Confirmation',
            type: 'password'
        }
    ];

    return (
        <div className='flex relative h-full items-center justify-center w-full'>
            <div className='border bg-white grid grid-rows-6 gap-5 h-3/4 p-5 rounded w-1/3'>
                <div className='flex items-center justify-start'>
                    <h1 className='text-xl font-bold'>
                        Create your account
                    </h1>
                </div>

                {
                    inputs.map((input) => {
                        return (
                            <div
                                className='row-span-1 grid grid-rows-2 gap-3 w-full'
                                key={ input.label }
                            >
                                <Label_Input
                                    value={ input.value }
                                    action={ input.action }
                                    label={ input.label }
                                    type={ input.type }
                                />
                            </div>
                        )
                    })
                }

                <Button
                    style='bg-blue-500 mt-2 h-16 rounded-lg hover:bg-blue-700 hover:text-blue-200 transition ease-in-out text-white w-1/3'
                    title='Sign Up'
                    action={ handleRegisterSubmit }
                />
            </div>
        </div>
    );
}