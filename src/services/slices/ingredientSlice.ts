import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TIngredientState {
  data: TIngredient[];
  loading: boolean;
  error: null | SerializedError;
}

const initialState: TIngredientState = {
  data: [],
  loading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredient/fetchIngredients',
  async () => await getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});
