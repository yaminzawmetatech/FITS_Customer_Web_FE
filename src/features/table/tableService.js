import axiosInstance from "features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}tables`;

const getTable = async () => {

  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const deleteTable = async (tableId) => {
 
  const response = await axiosInstance.delete(API_URL + "/" + tableId);
  return response.data;
};

const updateTable = async (tableId, tableData) => {
 
  const response = await axiosInstance.put(API_URL + "/" + tableId, tableData);
  return response.data;
};

const createTable = async (tableData) => {
  
  const response = await axiosInstance.post(API_URL, tableData);
  return response.data;
};

const batchDeleteTable = async (tableIds) => {
  
  const response = await axiosInstance.post(API_URL + "/batch-delete", tableIds);
  return response.data;
};

const tableService = {
  createTable,
  getTable,
  deleteTable,
  updateTable,
  batchDeleteTable,
};

export default tableService;
