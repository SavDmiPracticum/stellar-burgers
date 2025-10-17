import { TOrder } from '@utils-types';
import reducer, {
  createOrder,
  fetchOrder,
  fetchOrders,
  initialState
} from '../orderSlice';

const orders: TOrder[] = [
  {
    _id: '68ee505ab9d496001c839a2c',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-10-14T13:30:02.770Z',
    updatedAt: '2025-10-14T13:30:03.983Z',
    number: 91309
  }
];

describe('Тест редьюсера заказов', () => {
  describe('Тест списка заказов', () => {
    test('Список заказов: pending', () => {
      const state = reducer(initialState, fetchOrders.pending('pending'));
      expect(state.error).toBe(null);
    });
    test('Список заказов: fulfilled', () => {
      const state = reducer(
        initialState,
        fetchOrders.fulfilled(orders, 'fulfilled')
      );
      expect(state.error).toBe(null);
      expect(state.data).toEqual(orders);
    });
    test('Список заказов: rejected', () => {
      const error = 'fetchOrders.rejected';
      const state = reducer(
        initialState,
        fetchOrders.rejected(new Error(error), 'rejected')
      );
      expect(state.error?.message).toBe(error);
    });
  });
  describe('Тест запроса заказа', () => {
    test('Запрос заказа: pending', () => {
      const state = reducer(
        initialState,
        fetchOrder.pending('pending', orders[0].number)
      );
      expect(state.orderModalData).toBe(null);
    });
    test('Запрос заказа: fulfilled', () => {
      const state = reducer(
        initialState,
        fetchOrder.fulfilled(orders[0], 'fulfilled', orders[0].number)
      );
      expect(state.orderModalData).toEqual(orders[0]);
    });
    test('Запрос заказа: rejected', () => {
      const error = 'fetchOrder.rejected';
      const state = reducer(
        initialState,
        fetchOrder.rejected(new Error(error), 'rejected', -333)
      );
      expect(state.error?.message).toBe(error);
    });
  });
  describe('Тест создание заказа', () => {
    test('Создание заказа: pending', () => {
      const state = reducer(
        initialState,
        createOrder.pending('pending', orders[0].ingredients)
      );
      expect(state.orderRequest).toBe(true);
    });
    test('Создание заказа: fulfilled', () => {
      const state = reducer(
        initialState,
        createOrder.fulfilled(
          { order: orders[0], name: 'Бургер' },
          'fulfilled',
          orders[0].ingredients
        )
      );
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(orders[0]);
    });
    test('Создание заказа: rejected', () => {
      const error = 'createOrder.rejected';
      const state = reducer(
        initialState,
        createOrder.rejected(new Error(error), 'rejected', [])
      );
      expect(state.orderRequest).toBe(false);
      expect(state.error?.message).toBe(error);
    });
  });
  describe('Тест модального окна', () => {
    test('Сброс данных модального окна заказа', () => {
      const state = {
        ...initialState,
        orderModalData: orders[0]
      };
      const newState = reducer(state, {
        type: 'order/resetOrderModalData'
      });
      expect(newState.orderModalData).toBe(null);
    });
  });
});
