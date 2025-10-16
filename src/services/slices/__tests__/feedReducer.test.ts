import reducer, { fetchFeed, initialState } from '../feedSlice';

const feedData = {
  success: true,
  orders: [
    {
      _id: '68ee505ab9d496001c839a2c',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'бургер',
      createdAt: '2025-10-14T13:30:02.770Z',
      updatedAt: '2025-10-14T13:30:03.983Z',
      number: 91309
    }
  ],
  total: 0,
  totalToday: 0
};

describe('Тест редьюсера ленты заказов', () => {
  test('Запрос ленты заказов: pending', () => {
    const state = reducer(initialState, fetchFeed.pending('pending'));
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });
  test('Запрос ленты заказов: fulfilled', () => {
    const state = reducer(
      initialState,
      fetchFeed.fulfilled(feedData, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.data).toEqual(feedData);
  });
  test('Запроса ленты заказов: rejected', () => {
    const error = 'fetchFeed.rejected';
    const state = reducer(
      initialState,
      fetchFeed.rejected(new Error(error), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error?.message).toBe(error);
  });
});
