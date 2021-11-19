import axios from 'axios';
import { baseUrl } from 'services';

export const getEvaluation = () => {
    return axios.get(`${baseUrl}/personnel-evaluation-admin/all`);
};

export const postEvaluation = (data: any) => {
    return axios.post(`${baseUrl}/personnel-evaluation-admin/create`, data);
};

export const deleteEvaluation = (_id: string) => {
    return axios.delete(`${baseUrl}/personnel-evaluation-admin/${_id}`);
};

export const putEvaluation = (_id: string, data: any) => {
    return axios.put(`${baseUrl}/personnel-evaluation-admin/update/${_id}`, data);
  };