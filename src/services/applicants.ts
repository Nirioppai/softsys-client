import axios from 'axios';
import { baseUrl } from 'services';

export const getApplicants = () => {
  return axios.get(`${baseUrl}/applicants.json`);
};
