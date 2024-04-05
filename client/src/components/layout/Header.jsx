import { useNavigate } from 'react-router-dom';

import ReactLogo from '../../assets/react.svg';

import Button from '../Button';
import SearchBar from '../SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import ProfileMenu from './ProfileMenu';

export default function Header() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    return (
        <div className='bg-white shadow-sm flex items-center justify-center h-full w-full'>
            <div className='container grid grid-cols-12 h-full'>
                <div className='col-span-1 flex h-full items-center justify-center p-3 w-full'>
                    <img className='h-full w-auto' src={ ReactLogo } alt='Logo of React' />
                </div>

                <div className='flex items-center justify-start col-span-6'>
                    <SearchBar />
                </div>

                <div className='col-span-5 flex items-center justify-end'>
                    {
                        token !== null ?
                            <>
                                <Button
                                    style={ 'border border-blue-500 ease-in-out hover:border-blue-900 hover:bg-blue-700 hover:text-white mx-2 py-2 px-10 rounded text-blue-500 transition' }
                                    title="Create Post"
                                    action={ () => { navigate('/post') }}
                                />    

                                <Button
                                    style={ 'ease-in-out hover:bg-blue-100 hover:text-blue-500 mx-2 py-2 px-5 rounded text-black text-2xl transition' }
                                    title={ <FontAwesomeIcon icon={ faBell} /> }
                                    action={ () => { navigate('/notifications') }}
                                />

                                <ProfileMenu />
                            </>                                        
                        :
                            <>
                                <Button
                                    style={ 'ease-in-out hover:bg-blue-100 hover:text-blue-500 mx-2 py-2 px-5 rounded text-black transition' }
                                    title="Log In"
                                    action={ () => { navigate('/signIn') }}
                                />

                                <Button
                                    style={ 'border border-blue-500 ease-in-out hover:border-blue-900 hover:bg-blue-700 hover:text-white mx-2 py-2 px-10 rounded text-blue-500 transition' }
                                    title="Create account"
                                    action={ () => { navigate('/signUp') }}
                                />
                            </>
                    }
                </div>
            </div>
        </div>
    );
}