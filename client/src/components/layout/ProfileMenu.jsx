import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user !== null) {
            setProfilePicture(user.profilePicture);
            setUsername(user.username);
        }
    }, [profilePicture]);

    const menuLinks = [
        {
            title: 'Dashboard',
            action: () => navigate('/dashboard'),
        },
        {
            title: 'Create Post',
            action: () => navigate('/new'),
        },
        {
            title: 'Reading List',
            action: () => navigate('/readinglist'),
        },
        {
            title: 'Settings',
            action: () => navigate('/settings'),
        }
    ];

    return (
        <div className='border h-16 mx-2 rounded-full w-16'>
            <img
                className='hover:cursor-pointer h-full rounded-full hover:shadow-lg w-full'
                src={ profilePicture }
                alt={ `Avatar of ${ username }` }
                onClick={ () => setToggle(!toggle) }
            />

            {
                toggle &&
                    <div className='absolute bg-slate-50 border h-auto inset-x-0 m-auto md:mr-5 lg:mr-96 p-2 rounded-sm top-28 md:top-24 shadow-md w-5/6 md:w-1/2 lg:w-1/6'>
                        <div
                            className='hover:bg-blue-200 hover:cursor-pointer grid grid-rows-2 px-5 py-2 rounded-sm hover:text-blue-500 w-full'
                            onClick={ () => navigate(`/${ username }`)} // TODO: How to handle users routes?
                        >
                            <h1 className='text-xl capitalize w-full'>{ username }</h1>
                            <h3 className='text-gray-500'>{ `@${ username }` }</h3>
                        </div>

                        <hr className='my-2 w-full' />

                        {
                            menuLinks.map((links, index) => {
                                return (
                                    <div
                                        key={ index }
                                        className='hover:bg-blue-200 hover:cursor-pointer px-5 py-2 rounded-sm hover:text-blue-500 w-full'
                                        onClick={ links.action }
                                    >
                                        <h1 className='text-xl capitalize w-full'>{ links.title }</h1>
                                    </div>
                                );
                            })
                        }

                        <hr className='my-2 w-full' />


                        <div
                            className='hover:bg-blue-200 hover:cursor-pointer px-5 py-2 rounded-sm hover:text-blue-500 w-full'
                            onClick={ () => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');

                                navigate('/signIn');
                            }}
                        >
                            <h1 className='text-xl capitalize w-full'>Sign Out</h1>
                        </div>
                    </div>
            }
        </div>
            
    );
}
