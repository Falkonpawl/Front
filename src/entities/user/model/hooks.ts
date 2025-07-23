import { useMutation, useQuery } from '@tanstack/react-query';
import { 
  getUserById, 
  getUsers,
  createUser, 
  updateUser,
  deleteUser
} from '@entities/user/model/api';
import { UserFormValues } from '@entities/auth/model/types';

// Получение пользователя по ID
export const useUserById = (id: number | string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

// Получение всех пользователей
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

// Создание пользователя
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

// Обновление пользователя

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, data }: { 
      id: string; 
      data: Omit<Partial<UserFormValues>, 'email' | 'password' | 'confirmPassword'> 
    }) => updateUser(id, data),
  });
};

// Удаление пользователя
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};