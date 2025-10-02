import { getFeedsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

interface TFeedState {
  data: TOrdersData;
  loading: boolean;
  error: null | SerializedError;
}

const initialState: TFeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: true,
  error: null
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});
