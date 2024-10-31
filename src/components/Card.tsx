import { HomePageVideos } from '@/Types';
import { useSidebarContext } from '@/context/SidebarContext';

import { Link } from 'react-router-dom';

export default function Card({ data }: { data: HomePageVideos }) {
	const {isLargeOpen} = useSidebarContext()
	return (
		<div className={` ${isLargeOpen?'md:w-[24.7rem] md:h-[20.2rem]':'md:w-[21rem] md:h-[20rem]'} cursor-pointer  flex gap-3 flex-col`}>
			<div className="relative ">
				<span className={`absolute ${isLargeOpen? 'top-[12.3rem]': 'top-[10.2rem]'} rounded-md  right-1 text-sm bg-black bg-opacity-70   px-2 py-0.5 `}>
					{data.videoDuration} 
				</span>
				<Link to={`/watch/${data.videoId}`}>
					<img
						src={data.videoThumbnail}
					className={`${isLargeOpen?'h-56':'h-48'} w-full mx-auto rounded-lg `}
						alt="thumbnail"
					/>
				</Link>
				<div className="flex gap-2  mt-2">
					<div className="min-w-fit">
						<a href="#">
							<img
								src={data.channelInfo.image}
								alt="channel"
								className="h-9 w-9 rounded-full mt-1"
							/>
						</a>
					</div>
					<div>
						<h3>
							<a href="" className="line-clamp-2 ">
								{data.videoTitle}
							</a>
						</h3>
						<div className=" flex flex-col text-gray-400">
							<div>
								<a href="#" className="hover:text-white ">
									{data.channelInfo.name}
								</a>
							</div>
							<div className="text-sm">
								<span className="after:content-['•'] after:mx-1">
									{data.videoViews} views
								</span>
								<span>{data.videoAge} ago</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
