import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBagShopping, faBookOpen, faHeart, faHouse,
    faLightbulb,faMicrophone, faPhone, faStar,
    faTags, faVideoCamera, faX
} from "@fortawesome/free-solid-svg-icons";

import Button from "../Button";

export default function Navigation({ handleToggle }) {
    const navigate = useNavigate();

    const navLinks = [
        {
            icon: faHouse,
            title: 'Home',
            action: () => navigate('/')
        },
        {
            icon: faMicrophone,
            title: 'Podcasts',
            action: () => navigate('/pod')
        },
        {
            icon: faVideoCamera,
            title: 'Videos',
            action: () => navigate('/videos')
        },
        {
            icon: faTags,
            title: 'Tags',
            action: () => navigate('/tags')
        },
        {
            icon: faLightbulb,
            title: 'DEV Help',
            action: () => navigate('/help')
        },
        {
            icon: faBagShopping,
            title: 'Forem Shop',
            action: () => navigate('/shop')
        },
        {
            icon: faHeart,
            title: 'Advertise on DEV',
            action: () => navigate('/advertise')
        },
        {
            icon: faStar,
            title: 'DEV Showcase',
            action: () => navigate('/showcase')
        },
        {
            icon: faHouse,
            title: 'About',
            action: () => navigate('/about')
        },
        {
            icon: faPhone,
            title: 'Contact',
            action: () => navigate('/contact')
        },
        {
            icon: faBookOpen,
            title: 'Guides',
            action: () => navigate('/guides')
        },
        {
            icon: faLightbulb,
            title: 'Software comparisons',
            action: () => navigate('/')
        }
    ];

    return (
        <div className='absolute bg-white h-screen left-0 top-0 w-3/5 md:w-3/6 lg:hidden z-10'>
            <div className='grid grid-cols-4 items-center justify-center p-5 w-full'>
                <h1 className='col-span-3 font-bold text-2xl'>
                    DEV Community
                </h1>

                <Button
                    style='hover:bg-blue-200 hover:cursor-pointer hover:text-blue-500 p-2 rounded-md text-xl'
                    title={ <FontAwesomeIcon icon={ faX } /> }
                    action={ handleToggle }
                />
            </div>

            <div className='h-auto px-5 w-full'>
                {
                    navLinks.map((link, index) => {
                        return (
                            <div
                            key={ index }
                            className='hover:bg-blue-200 hover:cursor-pointer h-full hover:text-blue-500 p-2 rounded-md text-xl'
                        >
                            <Button
                                style='grid grid-cols-6 items-center justify-center w-full'
                                title={
                                    <>
                                        <FontAwesomeIcon className='col-span-1 text-blue-900 text-right w-full' icon={ link.icon } />
                                        <p className='col-span-5 text-left'>{ link.title }</p>
                                    </>
                                }
                                action={ link.action }

                            />
                        </div>
                        );
                    })
                }
            </div>
        </div>
    );
}