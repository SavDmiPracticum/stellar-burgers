import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { resetOrderModalData } from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/makerSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const orderRequest = useSelector(
    (store: RootState) => store.order.orderRequest
  );
  const orderModalData = useSelector(
    (store: RootState) => store.order.orderModalData
  );
  const constructorItems = useSelector((store) => store.maker);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
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
