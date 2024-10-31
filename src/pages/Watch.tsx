
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {  useAppSelector } from "../store/hooks";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useAppDisPatch } from "../store/hooks";
import WatchCard from "../components/WatchCard";
import { RecommendedVideos } from "@/Types";
import { useEffect, useState } from "react";

import SideBar from "@/components/SideBar";

export default function Watch() {
    const [showMoreStatus, setShowMoreStatus] = useState<boolean>();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDisPatch();
    const currentPlaying = useAppSelector(state => state.youtube.currentPlaying);
    const recommendedVideos = useAppSelector(state => state.youtube.recommendedVideos);
    

    useEffect(() => {
        if (id) {
            dispatch(getVideoDetails(id));
            setShowMoreStatus(true);
        } else navigate('/');

    }, [id, navigate, dispatch]);

    // console.log(dispatch(getRecommendedVideos(id)))//

    useEffect(() => {
      if (currentPlaying && id) dispatch(getRecommendedVideos(id));
      

    }, [id, dispatch, currentPlaying]);
    return (
        <>
        {currentPlaying && currentPlaying?.videoId === id && (
          <div className="max-h-screen overflow-hidden text-white">
            <div style={{ height: "7.5vh" }}>
              <Navbar />
            </div>
            <div className="flex w-full" style={{ height: "92.5vh" }}>
              <div className="flex flex-col md:flex-row overflow-auto md:gap-x-4 ">
                <SideBar/>
                <div className="md:mr:16" style={{ maxWidth: "800px" }} >
                  <div   >
                   
                     {/* <iframe
                      className="rounded-lg flex mx-auto my-2 md:m-0 "
                      width="450 md:900 "
                      height="290 md:502"
                      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                      </iframe>  */}
                    <div className="w-full h-56 md:h-[25rem]">

                    <div className="w-11/12 mx-auto h-full md:w-full">
                      
                    <iframe
                      className="rounded-lg  md:rounded-none mx-auto my-2 md:m-0 "
                          width='100%'
                          height='100%'
                      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
</div>
                    </div>
                    
                    <div className="mt-5 w-full flex flex-col justify-center ">
                      <p className="text-lg md:text-xl ml-4 md:m-0 ">{currentPlaying.videoTitle}</p>
                      <div className="flex justify-between mt-1">
                        <div className="text-sm text-gray-400">
                          <span className="after:content-['•'] after:mx-1">
                            {currentPlaying.videoViews} views
                          </span>
                          <span> {currentPlaying.videoAge} ago</span>
                        </div>
                        <div className="flex items-center gap-4 uppercase">
                          <div className="flex items-center gap-1 cursor-pointer">
                            <BiLike className="text-xl" />
                            <strong>{currentPlaying.videoLikes}</strong>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <BiDislike className="text-xl" />
                            <strong>dislike</strong>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <FaShare className="text-xl" />
                            <strong>share</strong>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <HiScissors className="text-xl" />
                            <strong>clip</strong>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <MdOutlinePlaylistAdd className="text-xl" />
                            <strong>save</strong>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <BsThreeDots className="text-xl" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-col ml-3 border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                        <div className="flex items-center gap-5 mr-5 mt-4">
                          <div>
                            <img
                              src={currentPlaying.channelInfo.image}
                              alt=""
                              className="rounded-full h-12 w-12"
                            />
                          </div>
                          <div className="w-5/6">
                            <h5 className="text-sm">
                              <strong>{currentPlaying.channelInfo.name}</strong>
                            </h5>
                            <h6 className="text-gray-400 text-xs">
                              {currentPlaying.channelInfo.subscribers} subscribers
                            </h6>
                          </div>
                          <div>
                            <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                              subscribe
                            </button>
                          </div>
                        </div>
                        <div
                          className={`${
                            !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                          } text-sm w-11/12`}
                        >
                          <pre
                            style={{
                              fontFamily: `"Roboto", sans-serif`,
                            }}
                            className="whitespace-pre-wrap"
                          >
                            {currentPlaying.videoDescription}
                          </pre>
                        </div>
                        <div>
                          <button
                            className="uppercase text-sm cursor-pointer"
                            onClick={() => setShowMoreStatus(!showMoreStatus)}
                          >
                            Show {showMoreStatus ? "less" : "more"}
                          </button>
                        </div>
                      </div>
                    </div>
                
                </div>
              </div>
                <div className="mr-24 flex flex-col gap-3">
                                {getRecommendedVideos.length && recommendedVideos.map((item: RecommendedVideos) => (
                      <WatchCard data={item} key={item.videoId}/>
                 ))}  
                </div>
              </div>
              </div>
          </div>
        )}
      </>
    )
}