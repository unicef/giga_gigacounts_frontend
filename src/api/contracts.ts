import axios from 'axios';
import { IContractsData } from '../components/Dashboard/Contracts/@types/ContractType';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/contract`;

axios.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('session');
    if (config !== undefined && config.headers !== undefined) {
      config.headers.Authorization = AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : '';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getContracts = async (): Promise<IContractsData | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get the contracts');
  } catch (error: unknown) {
    return error as Error;
  }
};

export const createContract = async (body: Record<string, unknown>): Promise<any> => {
  try {
    return await axios.post(`${BASE_URL}`, {
      body
    });
  } catch (error) {
    return error;
  }
};

export const updateContract = async (body: Record<string, unknown>): Promise<any> => {
  try {
    return await axios.put(`${BASE_URL}/draft`, {
      body
    });
  } catch (error) {
    return error;
  }
};

export const getContractByStatus = async (): Promise<any> => {
  try {
    return await axios.get(`${BASE_URL}/count/status`);
  } catch (error) {
    return error;
  }
};
