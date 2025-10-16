import store, { rootReducer, RootState } from '../../store';

describe('Тест rootReducer-а', () => {
  test('Вызов с состоянием undefined и экшеном UNKNOWN_ACTION ', () => {
    const initial: RootState = store.getState();
    const result: RootState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initial);
  });
});
