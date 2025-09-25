import { useSelector } from '../../services/store';
import { TProtectedRouteProps } from './types';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const { isAuthenticated, isAuthChecked, loginUserRequest } = useSelector(
    (store) => store.user
  );
  const location = useLocation();

  if (loginUserRequest) {
    return <Preloader />;
  }

  if (!isAuthChecked && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuthChecked && isAuthenticated) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};
