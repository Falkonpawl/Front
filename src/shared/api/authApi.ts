import axios from './axios';
import { User } from '@entities/user/model/types';

export const getMe = async (): Promise<User> => {
  const res = await axios.get<User>('/v1/auth/me', {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  await axios.post('/v1/auth/logout');
};