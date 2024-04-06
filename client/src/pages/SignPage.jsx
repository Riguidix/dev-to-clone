import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

import ReactLogo from '../assets/react.svg';
import Button from '../components/Button';
import Login from '../components/layout/Login';

export default function SignInPage({ page }) {
    const navigate = useNavigate();

    let loginMethods = [
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
        },
    ];

    return (
        <div className='flex flex-wrap h-5/6 items-center justify-center w-5/6 md:w-2/3 lg:w-1/3'>
            <div className='flex items-center justify-center w-full'>
                <img
                    className='bg-black hover:cursor-pointer h-1/3 px-3 py-2 rounded-lg w-auto'
                    src={ ReactLogo }
                    alt='Logo of React'
                    onClick={ () => navigate('/') }
                />
            </div>

            <div className='grid grid-rows-2 text-center w-full'>
                <h1 className='font-bold text-2xl'>
                    Join the DEV Community
                </h1>
                <h5>DEV Community is a community of 1 amazing developers.</h5>
            </div>

            <div className='flex flex-col h-2/4 items-center justify-center w-4/5'>
                {
                    loginMethods.map((method, index) => {
                        return (
                            (page === 'signIn') 
                            ?
                                (method.title === 'email') 
                                ?
                                    <>
                                        <>
                                            <div className="flex py-5 items-center w-full">
                                                <div className="flex-grow border-t border-gray-400"></div>
                                                <span className="flex-shrink mx-4">OR</span>
                                                <div className="flex-grow border-t border-gray-400"></div>
                                            </div>
                                        </>

                                        <Login />
                                    </>
                                :
                                <div
                                    key={ index }
                                    className='border hover:bg-gray-100 flex h-1/5 items-center justify-center my-2 rounded-md text-center w-full'
                                >
                                    <Button
                                        style='grid grid-cols-4 h-full items-center justify-center w-full'
                                        title={
                                            <>
                                                <FontAwesomeIcon className='text-center w-full' icon={ method.icon } />
                                                <p className='col-span-3'>
                                                    { method.textIn }
                                                </p>
                                            </>
                                        }
                                        action={ () => navigate('/register') }

                                    />
                                </div>
                            :
                                <div
                                    key={ index }
                                    className='border hover:bg-gray-100 flex h-1/5 items-center justify-center my-2 rounded-md text-center w-full'
                                >
                                    <Button
                                        style='grid grid-cols-4 h-full items-center justify-center w-full'
                                        title={
                                            <>
                                                <FontAwesomeIcon className='text-center w-full' icon={ method.icon } />
                                                <p className='col-span-3'>
                                                    { method.textUp }
                                                </p>
                                            </>
                                        }
                                        action={ () => navigate('/register') }

                                    />
                                </div>
                        );
                    })
                }
            </div>

            <div className='flex flex-wrap items-center justify-center w-full'>
                <div className='w-full'>
                    <p className='text-sm text-center'>
                        By signing up, you are agreeing to our <Link className='text-blue-500' to='#'>privacy policy</Link>, <Link className='text-blue-500' to='#'>terms of user</Link> and <Link className='text-blue-500' to='#'>code of conduct</Link>.
                    </p>
                </div>

                <hr className='my-5 w-full' />

                {
                    (page === 'signUp')
                    ?
                        <>
                            <h5>
                                Already have an account? <Link className='text-blue-500' to='/signIn'>Log in</Link>.
                            </h5>
                        </>
                    :
                        <>
                            <h5>
                                New to DEV Community?  <Link className='text-blue-500' to='/signUp'>Create account</Link>.
                            </h5>
                        </>
                }
            </div>
        </div>
    );
}
