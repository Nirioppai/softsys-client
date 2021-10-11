import axios from 'axios';
import { baseUrl } from 'services';

export const getEmployees = () => {
  return axios.get(`${baseUrl}/employees.json`);
};

export const postEmployee = (data: any) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, data);
};

export const putEmployee = (_id: string, data: any) => {
  return axios.put(`https://jsonplaceholder.typicode.com/users/${_id}`, data);
};

export const deleteEmployee = (_id: string) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${_id}`);
};
