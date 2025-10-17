import reducer, {
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  reorderIngredients
} from '../makerSlice';

const bun = {
  id: '643d69a5c3f7b9001cfa093c',
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
};

const main = {
  id: '643d69a5c3f7b9001cfa093e',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const sauce = {
  id: '643d69a5c3f7b9001cfa093d',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

describe('Тест конструктора бургера', () => {
  test('Добавление булки', () => {
    const state = reducer(initialState, addBun(bun));
    expect(state.bun).toEqual(bun);
  });
  test('Добавление начинки', () => {
    const stateAfterMain = reducer(initialState, addIngredient(main));
    const stateAfterSauce = reducer(stateAfterMain, addIngredient(sauce));
    expect(stateAfterSauce.ingredients).toContainEqual(main);
    expect(stateAfterSauce.ingredients).toContainEqual(sauce);
    expect(stateAfterSauce.ingredients).toHaveLength(2);
  });
  test('Удаление начинки', () => {
    const stateAfterMain = reducer(initialState, addIngredient(main));
    const stateAfterSauce = reducer(stateAfterMain, addIngredient(sauce));
    const resultState = reducer(stateAfterSauce, removeIngredient(sauce.id));
    expect(resultState.ingredients).toHaveLength(1);
    expect(resultState.ingredients).not.toContainEqual(sauce);
  });
  test('Перемещение начинки вверх', () => {
    const stateAfterMain = reducer(initialState, addIngredient(main));
    const stateAfterSauce = reducer(stateAfterMain, addIngredient(sauce));
    const resultState = reducer(
      stateAfterSauce,
      reorderIngredients({ index: 1, upwards: true })
    );
    expect(resultState.ingredients[0]).toEqual(sauce);
    expect(resultState.ingredients[1]).toEqual(main);
  });
  test('Перемещение начинки вниз', () => {
    const stateAfterMain = reducer(initialState, addIngredient(main));
    const stateAfterSauce = reducer(stateAfterMain, addIngredient(sauce));
    const resultState = reducer(
      stateAfterSauce,
      reorderIngredients({ index: 0, upwards: false })
    );
    expect(resultState.ingredients[0]).toEqual(sauce);
    expect(resultState.ingredients[1]).toEqual(main);
  });

  test('Очищение конструктора', () => {
    const stateAfterMain = reducer(initialState, addIngredient(main));
    const stateAfterSauce = reducer(stateAfterMain, addIngredient(sauce));
    const stateAfterBun = reducer(stateAfterSauce, addBun(bun));
    const resultState = reducer(stateAfterBun, resetConstructor());
    expect(resultState).toEqual(initialState);
  });
});
