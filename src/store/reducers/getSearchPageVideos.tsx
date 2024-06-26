import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import {  SearchPageVideos } from "../../Types";
import { parseData } from "@/utils/parseData";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtube/serachPageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtube: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    const parsedData: SearchPageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);