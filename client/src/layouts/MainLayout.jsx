import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
    return(
        <div className='grid grid-rows-12 h-screen w-full'>
            <div className='row-span-1 text-center'>
                <Header />
            </div>

            <div className='row-span-10'>
                <Outlet />
            </div>

            <div className='row-span-1 text-center'>
                <Footer />
            </div>
        </div>
    );
}