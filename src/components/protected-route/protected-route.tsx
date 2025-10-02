import { useSelector } from '../../services/store';
import { TProtectedRouteProps } from './types';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: TProtectedRouteProps) => {
  const { isAuthenticated, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};
