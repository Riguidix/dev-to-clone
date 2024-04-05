import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

import ReactLogo from '../assets/react.svg';
import Login from '../components/layout/Login';

export default function SignInPage({ page }) {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    let linksMethods = [
        {
            title: 'github',
            icon: faGithub,
            textUp: 'Sign up with GitHub',
            textIn: 'Continue with GitHub'
        },
        {
            title: 'twitter',
            icon: faTwitter,
            textUp: 'Sign up with Twitter',
            textIn: 'Continue with Twitter'
        },
        {
            title: 'email',
            icon: faEnvelope,
            textUp: 'Sign up with Email',
            textIn: 'Continue with Email',
        }
    ];

    return (
        <div className='grid grid-rows-12 gap-1 h-2/3 p-5 relative rounded-xl w-1/3'>
            {
                toggle && <Login handleToggle={ () => setToggle(!toggle) } />
            }

            <div className='row-span-2 flex h-2/3 items-center justify-center w-auto'>
                <img className='h-full w-auto' src={ ReactLogo } alt='Logo of React' />
            </div>

            <div className='gap-2 grid grid-rows-2 h-auto text-center py-2 row-span-2 w-full'>
                <h1 className='font-bold text-4xl'>Join the DEV Community</h1>
                <h5>DEV Community is a community of 2 amazing developers.</h5>
            </div>

            <div className='gap-2 grid grid-rows-3 mx-auto row-span-5 w-3/4'>
                {
                    linksMethods.map((link) => {
                        return(
                            <div
                                className='border gap-2 grid grid-cols-10 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-800 hover:font-bold select-none rounded-xl shadow'
                                key={ link.title }
                                onClick={ () => {
                                    if (page === 'signUp') {
                                        navigate('/signUp/register');
                                    } else {
                                        setToggle(!toggle);
                                    }
                                } }
                            >
                                <div className='col-span-2 flex items-center justify-center'>
                                    <FontAwesomeIcon className='h-1/3 w-1/3' icon={ link.icon } />
                                </div>

                                <div className='col-span-8 flex items-center justify-center'>
                                    { page === 'signUp' ? link.textUp : link.textIn }
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div className="grid grid-rows-3 row-span-3 mt-5 w-full">
                <div className='col-span-1 m-auto w-2/3'>
                    <p className='text-sm text-center'>
                        By signing up, you are agreeing to our <Link className='text-blue-500' to="#">privacy policy</Link>, <Link className='text-blue-500' to="#">terms of user</Link> and <Link className='text-blue-500' to="#">code of conduct</Link>.
                    </p>

                    <hr className='my-5' />

                    {
                        (page === 'signUp') ?
                            <>
                                <h5 className='text-center'>Already have an account? <Link className='text-blue-500' to="/signIn">Log in</Link>.</h5>
                            </>
                        : 
                            <>
                                <h5 className='text-center'>New to DEV Community? <Link className='text-blue-500' to="/signUp">Create account</Link>.</h5>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}