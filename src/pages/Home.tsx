import { SidebarProvider } from '@/context/SidebarContext';
import Navbar from '../components/Navbar';
import SideBar from '@/components/SideBar';
import { useAppDisPatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

import { getHomePageVideos } from '@/store/reducers/getHomePageVideos';

function Home() {
	const dispatch = useAppDisPatch();
	const videos = useAppSelector((state) => state.youtube.videos);

	useEffect(() => {
		dispatch(getHomePageVideos(true));
	});
	return (
		<SidebarProvider>
			<div className="max-h-screen overflow-hidden">
				<div style={{}}>
					<Navbar />
				</div>
				<div className="flex" style={{ height: '92.5vh' }}>
					<SideBar />
				</div>
			</div>
		</SidebarProvider>
	);
}

export default Home;
