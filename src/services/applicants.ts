import axios from 'axios';
import { mockApiUrl } from 'services';

export const getApplicants = () => {
  return axios.get(`${mockApiUrl}/applicants.json`);
};
