import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useLogin } from '../model/useLogin';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutateAsync, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await mutateAsync(data);
      navigate('/');
    } catch {
      alert('Ошибка входа');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Вход
      </Typography>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Email обязателен',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Неверный email',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Пароль"
        fullWidth
        type="password"
        margin="normal"
        {...register('password', {
          required: 'Пароль обязателен',
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isPending}
      >
        Войти
      </Button>
    </Box>
  );
};