import { InitialState } from '@/Types';
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { getHomePageVideos } from './reducers/getHomePageVideos';

const initialState: InitialState = {
	videos: [],
	currentPlaying: null,
	searchTerm: '',
	searchResults: [],
	nextPageToken: null,
	recommendedVideos: [],
};

const YoutubeSlice = createSlice({
	name: 'youtube',
	initialState,
	reducers: {
		clearVideos: (state) => {
			(state.videos = []), (state.nextPageToken = null);
		},

		changeSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
		clearSearchTerm: (state) => {
			state.searchTerm = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
			state.videos = action.payload.parsedData;
		});
	},
});

export const store = configureStore({
	reducer: {
		youtube: YoutubeSlice.reducer,
	},
});

export const { clearVideos, changeSearchTerm, clearSearchTerm } =
	YoutubeSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
