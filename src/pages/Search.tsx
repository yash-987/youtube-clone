
import {  useSidebarContext } from '@/context/SidebarContext';
import Navbar from '../components/Navbar';
import SideBar from '@/components/SideBar';
import { useAppDisPatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';



import Spinner from '@/components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import {  SearchPageVideos } from '@/Types';


import { clearVideos } from '@/store';
import { getSearchPageVideos } from '@/store/reducers/getSearchPageVideos';
import SearchCard from '@/components/SearchCard';

// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function Home() {
	const dispatch = useAppDisPatch();
  const videos = useAppSelector((state) => state.youtube.videos);
  const {isLargeOpen} = useSidebarContext()

  useEffect(() => {
         dispatch(clearVideos())
		dispatch(getSearchPageVideos(false));
		
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
				<div className="flex " style={{ height: '92.5vh' }} >
					<SideBar />
					
					<div className={isLargeOpen?'md:w-[85vw]':'md:w-full'}>

						{videos.length ? (
							<InfiniteScroll
								 
								
								dataLength={videos.length}
								next={() => {
									dispatch(getSearchPageVideos(true));
								}}
								hasMore={videos.length < 500}
								loader={<Spinner />}
								height={700}
								
							
								
							>
								<div
									className={`flex flex-col pt-4  mx-6 gap-4 md:gap-2  `}
								>
									{videos.map((item: SearchPageVideos) => {
										return <SearchCard data={item} key={item.videoId} />;
									})}
								</div>
							</InfiniteScroll>
						) : (
							<Spinner />
						)}
					</div>
						
						</div>
				  
				</div>
			
		</>
	);
}

export default Home;
