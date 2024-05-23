
import { HomePageVideos } from '@/Types';
import { useSidebarContext } from '@/context/SidebarContext';

import { Link } from 'react-router-dom';

export default function Card({ data }: { data: HomePageVideos }) {
	const {isLargeOpen} = useSidebarContext()
	return (
		<div className={`${isLargeOpen? '' :'ml-4 '} cursor-pointer  md:h-[17rem]  flex gap-3 flex-col`}>
			<div className={`relative flex flex-col md:flex-row ${isLargeOpen? 'md:gap-4':''} `}>
				<span className={` flex  justify-center absolute top-[13.8rem]  ${isLargeOpen?'md:left-[25.7rem]':'md:left-[27.8rem] '} w-12 md:top-[14.6rem] rounded-md  right-1 text-sm bg-black bg-opacity-70  py-0.5 `}>
					{data.videoDuration} 
				</span>
                <Link to={`/watch/${data.videoId}`} className='md:h-full md:w-[38%]'>
					<img
						src={data.videoThumbnail}
						className={` md:h-full ${isLargeOpen? 'md:w-full': 'md:w-[90%]'} w-full mx-auto rounded-xl`}
						alt="thumbnail"
					/>
				</Link>
				<div className="flex md:flex-col gap-3 md:w-[62%]  mt-2">
					<div className='flex md:hidden min-w-fit'>
					<a href="#">
							<img
								src={data.channelInfo.image}
								alt="channel"
								className="h-8 w-8 rounded-full mt-1"
							/>
                            </a>
					</div>
					<div  className='flex flex-col '>
						<h3 className='text-lg '>
							<a href="" className="line-clamp-2 ">
								{data.videoTitle}
							</a>
						</h3>
						<div className=" flex md:flex-col text-gray-400">
							
							<div className="text-sm ">
							
								<a href="#" className= "after:content-['•'] after:mx-1 hover:text-white text-gray-400 md:hidden  md:text-sm ">
									{data.channelInfo.name}
								</a>
                    
								<span className="after:content-['•'] after:mx-1">
									{data.videoViews} views
								</span>
								<span>{data.videoAge} ago</span>
							</div>
                        </div>
                    </div>
                        <div className= " hidden md:flex  min-w-fit  items-center gap-2">
						<a href="#">
							<img
								src={data.channelInfo.image}
								alt="channel"
								className="h-8 w-8 rounded-full mt-1"
							/>
                            </a>
                            <div>
								<a href="#" className="hover:text-white text-gray-400 text-sm ">
									{data.channelInfo.name}
								</a>
							</div>
                    </div>
                    
								<div className=" hidden md:flex max-w-2xl line-clamp-2 text-sm text-gray-400">
			<p>{data.videoDescription}</p>
			</div>
				</div>
			</div>
		</div>
	);
}
