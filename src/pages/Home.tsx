
import Navbar from '../components/Navbar';
import SideBar from '@/components/SideBar';
import { useAppDisPatch, useAppSelector } from '@/store/hooks';
import {  useEffect } from 'react';

import { getHomePageVideos } from '@/store/reducers/getHomePageVideos';

import Spinner from '@/components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HomePageVideos } from '@/Types';

import Card from '@/components/Card';
import { clearVideos } from '@/store';
import { useSidebarContext } from '@/context/SidebarContext';


// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function Home() {
	const { isLargeOpen } = useSidebarContext();
	const dispatch = useAppDisPatch();
	const videos = useAppSelector((state) => state.youtube.videos);

	useEffect(() => {
		return () => {
			dispatch(clearVideos());
		};
	}, [dispatch]);
	useEffect(() => {
		dispatch(getHomePageVideos(false));
		console.log(videos)
	}, [dispatch]);

	// try {
	// 	async function getApi() {
	// 		const res = await fetch(
	// 			`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="reactjs projects"&key=${API_KEY}`
	// 		);
	// 		const data = await res.json();
	// 		console.log(data);
	// 	}
	// 	getApi();
	// } catch (error) {
	// 	console.log(error);
	// }

	return (
		<>
			
			<div className="max-h-screen overflow-hidden text-white">
				<div style={{}}>
					<Navbar />
				</div>
				<div className={`flex   ` }style={{ height: '92.5vh' }}  >
					<SideBar
					
					/>
					
						
					{videos.length ? (
						<InfiniteScroll
                              


							dataLength={videos.length}
							next={() => {
								dispatch(getHomePageVideos(true));
							}}
							hasMore={videos.length < 500}
							loader={<Spinner />}
							height={700}
							
						
							
						>
							<div
									className={` flex flex-col gap-8 mx-6 pt-5 md:grid md:gap-4 ${isLargeOpen ? 'md:grid-cols-3  md:pr-5 md:gap-y-10' :
										'md:grid-cols-4 md:pr-4 md:gap-y-4'
								}   md:mt-6 `}
							>
								{videos.map((item: HomePageVideos) => {
									return <Card data={item} key={item.videoId} />;
								})}
							</div>
						</InfiniteScroll>
					) : (
						<Spinner />
					)}
				
				</div>
			</div>
		</>
	);
}

export default Home;
