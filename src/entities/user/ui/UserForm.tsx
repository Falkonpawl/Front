import React, { useEffect } from "react"
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { useForm, Controller, useWatch } from "react-hook-form"
import { UserFormValues } from "@entities/auth/model/types"

interface Props {
  defaultValues?: Partial<UserFormValues>
  onSubmit: (data: UserFormValues) => void
  isEdit?: boolean
}

export const UserForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      surName: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      birthDate: "",
      telephone: "",
      employment: "full",
      userAgreement: false,
    },
  })

  // Глубокое сравнение и сброс формы
  useEffect(() => {
    if (!defaultValues) return

    const currentValues = getValues()
    const newValues = {
      name: defaultValues.name ?? "",
      surName: defaultValues.surName ?? "",
      email: defaultValues.email ?? "",
      password: defaultValues.password ?? "",
      confirmPassword: defaultValues.confirmPassword ?? "",
      fullName: defaultValues.fullName ?? "",
      birthDate: defaultValues.birthDate ?? "",
      telephone: defaultValues.telephone ?? "",
      employment: defaultValues.employment ?? "full",
      userAgreement: defaultValues.userAgreement ?? false,
    }

    if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
      reset(newValues)
    }
  }, [defaultValues, reset, getValues])

  const name = useWatch({ control, name: "name" })
  const surName = useWatch({ control, name: "surName" })

  useEffect(() => {
    const fullName = `${name || ""} ${surName || ""}`.trim()
    setValue("fullName", fullName)
  }, [name, surName, setValue])

  const onFormSubmit = async (data: UserFormValues) => {
    if (!isEdit && data.password !== data.confirmPassword) {
      alert("Пароли не совпадают")
      return
    }

    const { confirmPassword, ...payload } = data

    const transformedPayload = {
      ...payload,
      birthDate: new Date(data.birthDate).toISOString(),
    }

    try {
      await onSubmit(transformedPayload)
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("Пользователь с таким email уже существует")
      } else {
        console.error("Submit error:", error)
        alert("Ошибка при отправке формы")
      }
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <TextField
        label="Имя"
        fullWidth
        margin="normal"
        {...register("name", {
          required: "Имя обязательно",
          maxLength: { value: 64, message: "Макс. длина — 64" },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Фамилия"
        fullWidth
        margin="normal"
        {...register("surName", {
          required: "Фамилия обязательна",
          maxLength: { value: 64, message: "Макс. длина — 64" },
        })}
        error={!!errors.surName}
        helperText={errors.surName?.message}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        disabled={isEdit}
        {...register("email", {
          required: "Email обязателен",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Неверный формат email",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      {!isEdit && (
        <>
          <TextField
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: { value: 6, message: "Мин. 6 символов" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Подтверждение пароля"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Подтвердите пароль",
              validate: (value) =>
                value === getValues("password") || "Пароли не совпадают",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </>
      )}

      <TextField
        label="Полное имя"
        fullWidth
        margin="normal"
        {...register("fullName", {
          required: "Поле обязательно",
          maxLength: { value: 130, message: "Макс. длина — 130" },
        })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        slotProps={{ inputLabel: { shrink: true } }} 
      />

      <TextField
        label="Дата рождения"
        type="date"
        fullWidth
        margin="normal"
        error={!!errors.birthDate}
        helperText={errors.birthDate?.message}
        {...register("birthDate", {
          required: "Введите дату рождения",
        })}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <TextField
        label="Телефон"
        fullWidth
        margin="normal"
        error={!!errors.telephone}
        helperText={errors.telephone?.message}
        {...register("telephone", {
          required: "Введите номер телефона",
          pattern: {
            value: /^\+?[0-9]{10,15}$/,
            message: "Введите номер в формате +7 XXX XXX-XX-XX"
          },
        })}
      />

      <TextField
        select
        label="Занятость"
        fullWidth
        margin="normal"
        defaultValue="full"
        error={!!errors.employment}
        helperText={errors.employment?.message}
        {...register("employment", {
          required: "Выберите тип занятости",
        })}
      >
        <MenuItem value="">—</MenuItem>
        <MenuItem value="full">Полная</MenuItem>
        <MenuItem value="part">Частичная</MenuItem>
        <MenuItem value="freelance">Фриланс</MenuItem>
      </TextField>

      <FormControlLabel
        control={
          <Controller
            name="userAgreement"
            control={control}
            render={({ field }) => <Checkbox {...field} />}
          />
        }
        label="Согласен с условиями"
      />

      <Box mt={2}>
        <Button type="submit" variant="contained" fullWidth>
          {isEdit ? "Сохранить" : "Создать"}
        </Button>
      </Box>
    </Box>
  )
}
