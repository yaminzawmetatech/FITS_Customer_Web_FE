import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}users`;
const WAPI_URL = `${base_url}users`;
const SYNC_URL = `${base_url}admin/sync-web-users`;

// Get users
const getUsers = async (params) => {
  const response = await axiosInstance.get(WAPI_URL, {params});

  return response.data;
};

// Delete user
const deleteUsers = async (userCode) => {
  const response = await axiosInstance.delete(API_URL + "/" + userCode);
  return response.data;
};

const updateUser = async (userCode, userData) => {
  const response = await axiosInstance.put(API_URL + "/" + userCode, userData);

  return response.data;
};

// Create new survery header
const createUser = async (userData) => {
  const response = await axiosInstance.post(API_URL, userData);

  return response.data;
};

//Get User by Uuid
const getUserByUuid = async (id) => {
  const response = await axiosInstance.get(API_URL + "/" + id);
  return response.data;
};

const assignCMCOUser = async (data) => {
  const response = await axiosInstance.post(`user-regions`, data);

  return response.data;
};

const getAgentsByDealerId = async (id) => {
  const response = await axiosInstance.get(`user-regions`, {
    params: { dealer_id: id },
  });

  return response.data;
};

const getCMCOUserByTownshipId = async (id) => {
  const response = await axiosInstance.get(`get-user-by-district` + "/" + id);

  return response.data;
};

const deleteCMCOUser = async (district_id, user_id) => {
  const response = await axiosInstance.delete(`user-regions/${user_id}`, {
    data: { district_id: district_id },
  });
  return response.data;
};

const syncWebUsers = async () => {
  const response = await axiosInstance.post(SYNC_URL);
  return response.data;
};

const usersService = {
  createUser,
  getUsers,
  deleteUsers,
  updateUser,
  getUserByUuid,
  assignCMCOUser,
  getCMCOUserByTownshipId,
  deleteCMCOUser,
  getAgentsByDealerId,
  syncWebUsers,
};

export default usersService;
