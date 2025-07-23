import React from "react"
import { Box, Typography } from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"

import {
  useUserById,
  useCreateUser,
  useUpdateUser,
} from "@entities/user/model/hooks"
import { UserForm } from "@entities/user/ui/UserForm"
import { UserFormValues } from "@entities/auth/model/types"
import { Loader } from "@shared/ui/Loader"
import axios from "axios"
import type { AxiosError } from "axios"

interface UserFormPageProps {
  mode: "create" | "edit"
}

const UserFormPage: React.FC<UserFormPageProps> = ({ mode }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = mode === "edit"

  // ID остается строкой (не конвертируем в число)
  const { data: userData, isLoading } = useUserById(id || "")

  const create = useCreateUser()
  const update = useUpdateUser()

  const handleSubmit = async (formData: UserFormValues) => {
    try {
      if (isEdit && id) {
        const { email, password, confirmPassword, ...updateData } = formData

        await update.mutateAsync({
          id,
          data: {
            ...updateData,
            birthDate: formData.birthDate?.split("T")[0],
          },
        })
      } else {
        if (!formData.password) {
          throw new Error("Пароль обязателен")
        }

        await create.mutateAsync({
          ...formData,
          birthDate: formData.birthDate?.split("T")[0],
        })
      }

      navigate("/")
    } catch (err: unknown) {
      console.error("Submit error:", err)

      // Правильная проверка типа ошибки
      if (err instanceof Error) {
        if ("response" in err) {
          // Обработка AxiosError
          const axiosError = err as AxiosError
          alert(
            axiosError.response?.data?.message ||
              axiosError.message ||
              "Ошибка сервера"
          )
        } else {
          alert(err.message)
        }
      } else {
        alert("Неизвестная ошибка")
      }
    }
  }

  const normalizedDefaultValues: Partial<UserFormValues> = React.useMemo(() => {
    if (!userData) return {}

    return {
      name: userData.name || "",
      surName: userData.surName || "",
      fullName: userData.fullName || "",
      email: userData.email || "",
      birthDate: userData.birthDate ? userData.birthDate.split("T")[0] : "",
      telephone: userData.telephone || "",
      employment: userData.employment || "full",
      userAgreement: userData.userAgreement ?? false,
      password: "", // Всегда пустой при редактировании
      confirmPassword: "",
    }
  }, [userData])

  if (isEdit && isLoading) return <Loader />

  return (
    <Box maxWidth="600px" mx="auto">
      <Typography variant="h4" mb={2}>
        {isEdit ? "Редактировать пользователя" : "Создать пользователя"}
      </Typography>

      <UserForm
        defaultValues={normalizedDefaultValues}
        onSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </Box>
  )
}

export default UserFormPage
