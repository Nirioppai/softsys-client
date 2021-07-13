import axios from 'axios';

const baseUrl = process.env.REACT_APP_MOCK_API_URL;

// Admin

export const getApplicants = () => {
  return axios.get(`${baseUrl}/applicants.json`);
};

export const getEmployees = () => {
  return axios.get(`${baseUrl}/employees.json`);
};

export const getRequests = () => {
  return axios.get(`${baseUrl}/requests.json`);
};

export const getRoles = () => {
  return axios.get(`${baseUrl}/roles.json`);
};

export const getPermissions = () => {
  return axios.get(`${baseUrl}/permissions.json`);
};
