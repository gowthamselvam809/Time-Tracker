import * as apiClient from './httpCommon';
import { apiRoutes } from "../helper/apiRoutes";

export const userLoginAPI = async (data) => apiClient.postAPICall(apiRoutes.userLogin, data).then(res => res.data);
export const userRegisterAPI = async (data) => apiClient.postAPICall(apiRoutes.userRegister, data).then(res => res.data)
export const getLastTimeEntriesAPI = async (data) => apiClient.postAPICall(apiRoutes.getLastTimeEntries, data).then(res => res.data);
export const createTimeEntriesAPI = async (data) => apiClient.postAPICall(apiRoutes.createTimeEntries, data).then(res => res.data);
export const updateTimeEntriesAPI = async (data) => apiClient.postAPICall(apiRoutes.updateTimeEntries, data).then(res => res.data);
