import reducer, { fetchIngredients, initialState } from '../ingredientSlice';

const ingredientData = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  }
];

describe('Тест редьюсера ингредиентов', () => {
  test('Запрос ингредиентов: pending', () => {
    const state = reducer(initialState, fetchIngredients.pending('pending'));
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });
  test('Запрос ингредиентов: fulfilled', () => {
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(ingredientData, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.data).toEqual(ingredientData);
  });
  test('Запрос ингредиентов: rejected', () => {
    const error = 'fetchIngredients.rejected';
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error(error), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error?.message).toBe(error);
  });
});
