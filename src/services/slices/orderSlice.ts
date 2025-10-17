import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  data: TOrder[];
  error: null | SerializedError;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TOrderState = {
  data: [],
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const fetchOrder = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data) => {
    const response = await getOrderByNumberApi(data);
    return response.orders[0];
  }
);

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'order/fetchOrders',
  async () => await getOrdersApi()
);

export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[]
>('order/createOrder', async (data) => {
  const res = await orderBurgerApi(data);
  return { order: res.order, name: res.name };
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderModalData = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error;
      });
  }
});

export const { resetOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
