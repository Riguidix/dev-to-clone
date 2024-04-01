import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='flex h-full items-center justify-center w-full'>
            <h1>
                <FontAwesomeIcon className='text-blue-500' icon={ faCode } /> with <FontAwesomeIcon className='text-red-500' icon={ faHeart } /> by <Link className='text-green-600 font-bold' to='https://github.com/Riguidix/' target='_blank'>Riguidix</Link>
            </h1>
        </div>
    ); 
}