import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
    return(
        <div className='grid grid-rows-12 h-screen w-screen'>
            <div>
                <Header />
            </div>

            <div className='flex items-center justify-center row-span-10'>
                <Outlet />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}