// LoginForm.tsx
import { useForm } from "react-hook-form"
import { Button, TextField, Box, Typography } from "@mui/material"

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  error?: string
}

export const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", mt: 8 }}
    >
      <Typography variant="h5" gutterBottom>
        Вход
      </Typography>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email обязателен",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Неверный email",
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
        {...register("password", {
          required: "Пароль обязателен",
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Вход..." : "Войти"}
      </Button>
    </Box>
  )
}
