import { Item, RecommendedVideos } from "@/Types";

import { YOUTUBE_API_URL } from "./constants";
import axios from "axios";
import { parseVideoDuration } from "./parseVideoDuration";
import { convertRawViewsToString } from "./convertRawViewsToString";
import { timeSince } from "./timeSince";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const parseRecommendedData = async (items: Item[], videoId: string) => {
    try {
        const videoIds: string[] = [];
        const channelIds: string[] = [];
        const newItems: Item[] = [];
        items.forEach((item: Item) => {
            channelIds.push(item.snippet.channelId);
            if (item.contentDetails?.upload?.videoId) {
                videoIds.push(item.contentDetails.upload.videoId);
                newItems.push(item);
            }
        });

        const {
            data: { items: videosData }
            
        } = await axios.get(`${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`);

        const parsedData: RecommendedVideos[] = [];

        newItems.forEach((item, index) => {
            if (index >= videosData.length) return;
            if (videoId === item?.contentDetails?.upload?.videoId) return;
            parsedData.push({
                videoId: item.contentDetails.upload.videoId,
                videoTitle: item.snippet.title,
                videoThumbnail: item.snippet.thumbnails.medium.url,
                videoDuration: parseVideoDuration(
                    videosData[index].contentDetails.videoDuration
                ),
                videoViews: convertRawViewsToString(
                    videosData[index].statistics.viewCount
                ),
                videoAge: timeSince(new Date(item.snippet.publishedAt)),
                channelInfo: {
                    id: item.snippet.channelId,
                    name: item.snippet.channelTitle,
                },
                
            });

           
        });

        return parsedData;
    }
    catch (err) {
        console.log(err);
    }
    
}
