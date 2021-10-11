import axios from 'axios';
import { baseUrl } from 'services';

export const getEmployees = () => {
  return axios.get(`${baseUrl}/employees.json`);
};
