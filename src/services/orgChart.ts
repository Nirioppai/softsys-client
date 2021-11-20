import axios from 'axios';
import { baseUrl } from 'services';

export const generateOrgChart = (data: any) => {
    console.log('POST request was made')
    return axios.post(`${baseUrl}/org-charts/create`, data);
}

export const getOrgChart = () => {
    return axios.get(`${baseUrl}/org-charts/all`);
}
