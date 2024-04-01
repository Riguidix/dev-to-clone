import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return(
        <div className='bg-red-500 grid grid-rows-12 container h-screen w-full'>
            <div className='row-span-1 text-center'>
                header
            </div>

            <div className='row-span-10'>
                <Outlet />
            </div>

            <div className='row-span-1 text-center'>
                footer
            </div>
        </div>
    );
}