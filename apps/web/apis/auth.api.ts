import axiosInstance from '../config/axios';

export const login = async (data: any) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const register = async (data: any) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};
