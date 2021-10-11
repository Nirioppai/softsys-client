import axios from 'axios';
import { IAdminLogin } from '../../types';

const baseURL = `${process.env.REACT_APP_HRIS_URL}/api`;

export const loginAdmin = (data: IAdminLogin) => {
  return axios.post(`${baseURL}/auth/admin/login`, data);
};
