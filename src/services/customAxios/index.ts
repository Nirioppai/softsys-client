import axios, { AxiosRequestConfig } from 'axios';

// Variables
const baseURL = `${process.env.REACT_APP_HRIS_URL}/api`;
const token = localStorage.getItem('token');

// Custom axios instance
const customAxios = axios.create({
  baseURL,
});

// Handlers
const requestHandler = (req: AxiosRequestConfig) => {
  req.headers.Authorization = token;
  return req;
};

const responseHandler = (res: any) => {
  if (res.status === 401) {
    window.location.href = '/';
  }

  return res;
};

const errorHandler = (err: any) => {
  return Promise.reject(err);
};

// Interceptors
customAxios.interceptors.request.use(
  (req) => requestHandler(req),
  (err) => errorHandler(err)
);

customAxios.interceptors.response.use(
  (res) => responseHandler(res),
  (err) => errorHandler(err)
);

export default customAxios;
