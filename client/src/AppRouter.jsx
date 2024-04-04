import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import SignPage from './pages/SignPage';

export default function AppRouter() {
	return (
		<Routes>
			<Route element={ <MainLayout /> }>
				<Route path="/" element={ <HomePage page="home" /> } />
			</Route>
			<Route path="/signIn" element={ <SignPage page="signIn" /> } />
			<Route path="/signUp" element={ <SignPage page="signUp" /> } />
		</Routes>
	);
}