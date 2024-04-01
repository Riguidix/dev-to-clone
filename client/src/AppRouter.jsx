import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

export default function AppRouter() {
	return (
		<Routes>
			<Route element={ <MainLayout /> }>
				<Route path="/" element={ <HomePage page="home" /> } />
			</Route>
		</Routes>
	);
}