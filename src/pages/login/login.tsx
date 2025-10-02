import { FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const [values, onChange] = useForm({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const loginUserError = useSelector((store) => store.user.loginUserError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (loginUserError) {
      setError(String(loginUserError.message));
    }
  }, [loginUserError]);

  return (
    <LoginUI
      errorText={error}
      email={values.email}
      password={values.password}
      handleSubmit={handleSubmit}
      onChange={onChange}
    />
  );
};
