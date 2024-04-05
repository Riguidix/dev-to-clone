import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    const links = [
        {
            title: 'Username',
            action: () => {
                navigate('/username');
            }
        },
        {
            title: 'Dashboard',
            action: () => {
                navigate('/dashboard');
            }
        },
        {
            title: 'Create Post',
            action: () => {
                navigate('/new');
            }
        },
        {
            title: 'Reading List',
            action: () => {
                navigate('/settings');
            }
        },
        {
            title: 'Settings',
            action: () => {
                navigate('/settings');
            }
        },
        {
            title: 'Sign Out',
            action: () => { 
                localStorage.removeItem('token');
                navigate('/signIn');
             }
        }
    ];

    return (
        <div className='relative h-16 w-16'>
            <img
                className='hover:cursor-pointer border rounded-full h-full w-full'
                src='https://joesch.moe/api/v1/random'
                alt='Avatar of User'
                onClick={ () => setToggle(!toggle) }
            />

            {
                toggle &&
                    <div className='absolute bg-gray-100 shadow-smgap-1 h-60 -bottom-60 right-1/4 rounded-lg w-60'>
                        {
                            links.map(link => {
                                return (
                                    <div
                                        key={ link.title }
                                        className='border hover:cursor-pointer hover:bg-blue-300 hover:text-blue-900 w-full'
                                        onClick={ link.action }
                                    >
                                        { link.title }
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    );
}