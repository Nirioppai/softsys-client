import axios from 'axios';
import { AdminLoginTypes } from '../../types';

const baseURL = `${process.env.REACT_APP_HRIS_URL}/api`;

export const loginAdmin = (data: AdminLoginTypes) => {
  return axios.post(`${baseURL}/auth/admin/login`, data);
};
