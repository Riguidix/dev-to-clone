import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ReactLogo from '../../assets/react.svg';
import Button from '../Button';
import SearchBar from '../SearchBar';
import ProfileMenu from '../layout/ProfileMenu';
import Navigation from './Navigation';

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    return (
        <div className='flex h-full items-center justify-center shadow-md w-full'>
            {/* ========== MOBILE LAYOUT ========== */}
            {
                toggle && <Navigation handleToggle={ () => setToggle(!toggle) } />
            }

            <div className={
                toggle
                    ? 'bg-red-500 grid grid-cols-10 md:hidden h-full opacity-50 relative w-full'
                    : 'grid grid-cols-10 md:hidden h-full relative w-full'                    
            }>

                <div className='col-span-3 sm:col-span-2 grid grid-cols-2'>
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon
                            className='hover:bg-blue-200 hover:cursor-pointer hover:text-blue-500 p-2 rounded-md text-xl'
                            icon={ faBars }
                            onClick={ () => setToggle(!toggle) }
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <img
                            className='bg-black hover:cursor-pointer h-3/6 px-3 py-2 rounded-lg w-auto'
                            src={ ReactLogo }
                            alt='Logo of React'
                            onClick={ () => navigate('/') }
                        />
                    </div>
                </div>

                <div 
                    className={
                            token !== null
                            ? 'col-span-6 col-start-7 flex items-center justify-center h-full w-full'
                            : 'col-span-6 sm:col-span-5 col-start-6 sm:col-start-7 grid grid-cols-5 items-center justify-center'
                        }
                    >
                    {
                        token !== null
                        ? // ========== LOG IN ==========
                            <>
                                <FontAwesomeIcon
                                    className='hover:bg-blue-200 hover:cursor-pointer mx-2 hover:text-blue-500 p-2 rounded-md text-xl'
                                    icon={ faMagnifyingGlass }
                                    onClick={ () => navigate('/search') }
                                />

                                <Button
                                    style='hover:bg-blue-200 hover:cursor-pointer mx-2 hover:text-blue-500 p-2 rounded-md text-xl'
                                    title={ <FontAwesomeIcon icon={ faBell } /> }
                                    action={ () => navigate('/notifications') }
                                />

                                <ProfileMenu />
                            </>
                        : // ========== LOG OUT ==========
                            <>
                               <div className='flex items-center justify-end'>
                                    <FontAwesomeIcon
                                        className='hover:bg-blue-200 hover:cursor-pointer hover:text-blue-500 p-2 rounded-md text-xl'
                                        icon={ faMagnifyingGlass }
                                        onClick={ () => navigate('/search') }
                                    />
                                </div>

                                <div className='col-span-4 flex items-center justify-center'>
                                    <Button
                                        style='border border-blue-500 hover:border-blue-900 hover:bg-blue-700 ease-in-out px-5 py-2 rounded hover:text-white transition'
                                        title='Create account'
                                        action={ () => navigate('/signUp') }
                                    />
                                </div>
                            </>
                    }
                </div>
            </div>

            {/* ========== DESKTOP LAYOUT ========== */}
            <div className='lg:container items-center justify-center h-full hidden md:flex md:visible w-full'>
                <div className='grid grid-cols-12 h-full w-full'>
                    <div className='flex items-center justify-center'>
                       <img
                            className='bg-black hover:cursor-pointer h-3/6 px-3 py-2 rounded-lg w-auto'
                            src={ ReactLogo }
                            alt='Logo of React'
                            onClick={ () => navigate('/') }
                        />
                    </div>

                    <div className='col-span-6 flex h-full items-center justify-start'>
                        <SearchBar />
                    </div>

                    <div className="col-span-5 flex items-center justify-end px-5">
                        {
                            token !== null
                            ? // ========== LOG IN ==========
                                <>
                                    <Button
                                        style='border border-blue-500 hover:border-blue-900 hover:bg-blue-700 ease-in-out hover:text-white mx-2 px-5 py-2 rounded text-blue-500 transition'
                                        title='Create Post'
                                        action={ () => navigate('/new') }
                                    />

                                    <Button
                                        style='hover:bg-blue-200 hover:cursor-pointer hover:text-blue-500 p-2 rounded-md text-xl'
                                        title={ <FontAwesomeIcon icon={ faBell } /> }
                                        action={ () => navigate('/notifications') }
                                    />

                                    <ProfileMenu />
                                </>
                            : // ========== LOG OUT ==========
                                <>
                                    <Button
                                        style='hover:bg-blue-200 hover:cursor-pointer hover:text-blue-500 p-2 rounded-md'
                                        title='Log In'
                                        action={ () => navigate('/signIn') }
                                    />

                                    <Button
                                        style='border border-blue-500 hover:border-blue-900 hover:bg-blue-700 ease-in-out mx-2 px-5 py-2 rounded hover:text-white transition'
                                        title='Create account'
                                        action={ () => navigate('/signUp') }
                                    />
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}