import { BrowserRouter } from 'react-router-dom';

import AppRouter from './AppRouter';

export default function App() {
	return (
		<div className='App bg-slate-50 flex items-center justify-center h-screen w-screen'>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</div>
	);
}