import axios from 'axios';
import { baseUrl } from 'services';

export const generateOrgChart = (data: any) => {
  return axios.post(`${baseUrl}/org-charts/create`, data);
};

export const getOrgChart = () => {
  return axios.get(`${baseUrl}/org-charts/all`);
};
