import { LoginForm } from '@entities/auth/ui/LoginForm';
import { useLogin } from '@entities/auth/model/hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const [error, setError] = useState('');
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError('');
      await login.mutateAsync(values);
      navigate('/');
    } catch (e: any) {
      setError('Неверные данные для входа');
    }
  };

  return <LoginForm onSubmit={handleSubmit} error={error} />;
};

export default LoginPage;
