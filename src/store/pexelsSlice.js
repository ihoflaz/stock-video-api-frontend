import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/pexels`;

export const searchPexelsVideos = createAsyncThunk(
  'pexels/searchVideos',
  async ({ query, page = 1 }) => {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query, page }
    });
    return { data: response.data, page };
  }
);

const pexelsSlice = createSlice({
  name: 'pexels',
  initialState: {
    videos: [],
    loading: false,
    error: null,
    totalHits: 0,
    currentPage: 1,
    query: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPexelsVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPexelsVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data.videos;
        state.totalHits = action.payload.data.total_results;
        state.currentPage = action.payload.page;
        state.query = action.meta.arg.query;
      })
      .addCase(searchPexelsVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pexelsSlice.reducer; 