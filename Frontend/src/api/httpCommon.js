import axios from 'axios'
import axiosRetry from 'axios-retry'

import { Url } from "../helper/apiRoutes";
import { formatData } from '../util/utils';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
    baseURL: `${Url.baseApiUrl}`,
    timeout: 60000
});

axiosInstance.defaults.headers = {
    'Content-Type': 'application/json',
}

axiosRetry(axiosInstance, {
    retries: 2,
    retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
    retryCondition: axiosRetry.isRetryableError,
    onRetry: (retryCount, error) => console.log(`retry count : ${retryCount}, error:${error}`)
});

const DEBUG = process.env.NODE_ENV === "development";

function errorResponseHandler(error) {
    if (DEBUG) { console.error(`Error: ${formatData(error)}`); }

    let errorMessage = '';
    if (error.response && error.response.data) {
        console.log(error.response, error.response.data)
        errorMessage = error.response.data;
    } else if (error.message) {
        console.log(error.message)

        errorMessage = error.message;
    } else {
        errorMessage = 'An unknown error occurred.';
    }

    toast.error(errorMessage, {
        autoClose: 5000,
    });

    return error;
}

axiosInstance.interceptors.request.use(function (config) {
    // const token = SessionStorage.getItem(SessionStorageKeys.SessionToken);
    // config.headers.Authorization = token ? `${token}` : '';

    if (DEBUG) { console.info(`Request: ${formatData(config)}`); }

    return config;
}, errorResponseHandler);

axiosInstance.interceptors.response.use(function (response) {
    if (DEBUG) { console.info(`Response: ${formatData(response)}`); }
    return response;
}, errorResponseHandler);

export const getAPICall = async (url, data) => axiosInstance.get(url, data);
export const postAPICall = async (url, data) => axiosInstance.post(url, data);
export const putAPICall = async (url, data) => axiosInstance.put(url, data);
export const deleteAPICall = async (url, data) => axiosInstance.delete(url, data);
