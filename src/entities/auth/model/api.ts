import axios from "@shared/api/axios"
import { User } from "@entities/user/model/types"

interface LoginCredentials {
  email: string
  password: string
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await axios.post<User>("/v1/auth/login", credentials, {
    withCredentials: true,
  })

  return response.data
}

export const getCurrentUser = async (): Promise<User> => {
  const res = await axios.get<User>("/v1/auth/me", {
    withCredentials: true,
  })

  return res.data
}
