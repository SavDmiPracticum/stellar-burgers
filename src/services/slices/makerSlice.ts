import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const makerSlice = createSlice({
  name: 'maker',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    reorderIngredients(
      state,
      action: PayloadAction<{ index: number; upwards: boolean }>
    ) {
      const ingredientLink = state.ingredients[action.payload.index];

      if (action.payload.upwards) {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = ingredientLink;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = ingredientLink;
      }
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  reorderIngredients,
  resetConstructor
} = makerSlice.actions;
