import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Watch from './pages/Watch';
import { SidebarProvider } from './context/SidebarContext';


function App() {
	return (
		<SidebarProvider>
		<BrowserRouter>
				<Routes>

					
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route path="/watch/:id" element={<Watch />} />
			</Routes>
			</BrowserRouter>
			</SidebarProvider>
	);
}

export default App;
