import { FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const [values, onChange] = useForm({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { loginUserError } = useSelector((store) => store.user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
  };

  useEffect(() => {
    if (loginUserError) {
      setError(String(loginUserError.message));
    }
  }, [loginUserError]);

  return (
    <RegisterUI
      errorText={error}
      email={values.email}
      userName={values.name}
      password={values.password}
      handleSubmit={handleSubmit}
      onChange={onChange}
    />
  );
};
