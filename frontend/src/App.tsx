import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Stream from './components/Stream';
import Upload from './components/Upload';
import './css/main.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Upload />}></Route>
				<Route path='image/:id' element={<Stream />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
