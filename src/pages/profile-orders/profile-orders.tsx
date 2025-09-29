import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orderSelector = useSelector((store) => store.order);
  const orders: TOrder[] = orderSelector.data;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
