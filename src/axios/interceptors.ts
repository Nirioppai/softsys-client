import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import { refresh } from './refresh';

/** refresh access Token */
const refresher = async (refreshToken: string) => {
  try {
    const data = await refresh(refreshToken);

    return data.data.token;
  } catch (err: any) {
    if (err?.response?.status === 403) {
      window.location.replace('/login');
    }

    return null;
  }
};

/** modify axios configuration before request is made  */
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  /** modify headers for axios request */

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.common['Authorization'] = token;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/** If response error is 403, fetch new access Token using refresh token on axios response interceptor */
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (error.response) {
    if (error.response.status === 403) {
      if (refreshToken) {
        const newToken = await refresher(refreshToken);

        if (newToken) {
          localStorage.setItem('token', newToken);
        }
      }
    }
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
