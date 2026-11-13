import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/first-due-date-setups`;

const getFirstDueDateSetup = async () => {

  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const getFirstDueDateSetupWithParams = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};

const deleteFirstDueDateSetup = async (firstDueDateSetupId) => {

  const response = await axiosInstance.delete(API_URL + "/" + firstDueDateSetupId);
  return response.data;
};

const updateFirstDueDateSetup = async (firstDueDateSetupId, firstDueDateSetupData) => {

  const response = await axiosInstance.put(API_URL + "/" + firstDueDateSetupId, firstDueDateSetupData);
  return response.data;
};

const createFirstDueDateSetup = async (firstDueDateSetupData) => {

  const response = await axiosInstance.post(API_URL, firstDueDateSetupData);
  return response.data;
};

const batchDeleteFirstDueDateSetup = async (firstDueDateSetupIds) => {
  
  const response = await axiosInstance.post(API_URL + "/batch-delete", firstDueDateSetupIds);
  return response.data;
};

const firstDueDateSetupService = {
  createFirstDueDateSetup,
  getFirstDueDateSetup,
  deleteFirstDueDateSetup,
  updateFirstDueDateSetup,
  batchDeleteFirstDueDateSetup,
  getFirstDueDateSetupWithParams,
};

export default firstDueDateSetupService;
