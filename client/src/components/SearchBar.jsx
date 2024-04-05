import { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar() {
    const [search, setSearch] = useState('');

    return (
        <div className='border border-gray-200 grid grid-cols-6 gap-1 h-2/3 hover:border-gray-700 rounded w-2/3'>
            <div className='col-span-5 flex items-center justify-center h-full w-full'>
                <input
                    className='border-none outline-none focus-visible:bg-none h-full px-3 w-full'
                    value={ search }
                    onChange={ (event) => setSearch(event.target.value) }
                    type="text"
                ></input>
            </div>
            <div className='col-span-1 flex items-center h-full hover:bg-blue-200 hover:text-blue-500 hover:cursor-pointer justify-center w-full'>
                <FontAwesomeIcon className='inline-block h-1/3 w-1/3' icon={ faMagnifyingGlass } />
            </div>
        </div>
    );
}