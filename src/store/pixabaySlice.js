import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/pixabay`;

export const searchPixabayVideos = createAsyncThunk(
  'pixabay/searchVideos',
  async ({ query, page = 1 }) => {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query, page }
    });
    return { data: response.data, page };
  }
);

const pixabaySlice = createSlice({
  name: 'pixabay',
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
      .addCase(searchPixabayVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPixabayVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data.hits;
        state.totalHits = action.payload.data.totalHits;
        state.currentPage = action.payload.page;
        state.query = action.meta.arg.query;
      })
      .addCase(searchPixabayVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pixabaySlice.reducer;