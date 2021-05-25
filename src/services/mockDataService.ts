import axios from 'axios';

const baseUrl = process.env.REACT_APP_MOCK_API_URL;

// Admin

export const getApplicants = () => {
  return axios.get(`${baseUrl}/applicants.json`);
};
