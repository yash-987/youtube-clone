
import { HomePageVideos } from '@/Types';
import { YOUTUBE_API_URL } from '@/utils/constants';
import { parseData } from '@/utils/parseData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getHomePageVideos = createAsyncThunk(
	'youtube/homePageVideos',
	async (isNext: boolean, { getState }) => {
		const {
			youtube: { nextPageToken: nextPageTokenFromState, videos },
		} = getState() as RootState;

		const {
			data: { items, nextPageToken },
		} = await axios.get(
			`${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${apiKey}&part=snippet&type=video&${
				isNext ? `pageToken=${nextPageTokenFromState}` : ""
			  }`
		);
		console.log({ items, nextPageTokenFromState, nextPageToken });

		const parsedData: HomePageVideos[] = await parseData(items);
		return {
			parsedData: [...videos, ...parsedData, ...nextPageToken],
		};
	}
);
