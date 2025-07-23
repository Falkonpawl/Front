import { useMutation } from '@tanstack/react-query';
import axios from '@shared/api/axios';

interface LoginDto {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const res = await axios.post('/api/v1/auth/login', data, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};