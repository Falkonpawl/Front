import { User } from "./types"
import axios from "@shared/api/axios"
import { UserFormValues } from "@entities/auth/model/types"
const API_PREFIX = "/v1"

export const getUserById = async (id: number | string): Promise<User> => {
  const res = await axios.get<User>(`${API_PREFIX}/users/${id}`)
  return res.data
}

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${API_PREFIX}/users`)
  return res.data
}

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await axios.post<User>(`${API_PREFIX}/users`, data)
  return response.data
}

export const updateUser = async (
  id: string,
  data: {
    name?: string
    surName?: string
    fullName?: string
    birthDate?: string
    telephone?: string
    employment?: string
    userAgreement?: boolean
  }
) => {
  const payload = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
  )

  const response = await axios.patch(`/v1/users/${id}`, payload)
  return response.data
}

export const deleteUser = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_PREFIX}/users/${id}`)
}
