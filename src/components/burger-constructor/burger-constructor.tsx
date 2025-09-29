import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  resetOrderModalData
} from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/makerSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector((store) => store.order.orderRequest);
  const orderModalData = useSelector((store) => store.order.orderModalData);
  const constructorItems = useSelector((store) => store.maker);
  const { isAuthenticated } = useSelector((store) => store.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) return navigate('/login');
    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];
    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
