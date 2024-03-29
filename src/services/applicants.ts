import axios from 'axios';
import { baseUrl } from 'services';

export const getApplicants = () => {
  return axios.get(`${baseUrl}/applicant/get-all`);
};

export const postApplicant = (data: any) => {
  return axios.post(`${baseUrl}/applicant/create`, data);
}

export const deleteApplicant = (id: any) => {
  return axios.delete(`${baseUrl}/applicant/deleteOne/${id}`);
}

export const putApplicant = (id: any, data: any) => {
  return axios.put(`${baseUrl}/applicant/update/${id}`, data);
}