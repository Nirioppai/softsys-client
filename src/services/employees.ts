import axios from 'axios';
import { baseUrl } from 'services';

export const getEmployees = () => {
  return axios.get(`${baseUrl}/employee`);
};

export const postEmployee = (data: any) => {
  return axios.post(`${baseUrl}/auth/employee/register`, data);
};

export const putEmployee = (_id: string, data: any) => {
  return axios.put(`${baseUrl}/employee/${_id}`, data);
};

export const deleteEmployee = (_id: string) => {
  return axios.delete(`${baseUrl}/employee/${_id}`);
};

// Employee information

export const getEmployeeInformation = (_id: string) => {
  return axios.get(`${baseUrl}/employeeInformations/${_id}`);
};

export const postEmployeeInformation = (data: any) => {
  return axios.post(`${baseUrl}/employeeInformations`, data);
};

export const putEmployeeInformation = (_id: string, data: any) => {
  return axios.put(`${baseUrl}/employeeInformations/${_id}`, data);
};

export const deleteEmployeeInformation = (_id: string) => {
  return axios.delete(`${baseUrl}/employeeInformations/${_id}`);
};
