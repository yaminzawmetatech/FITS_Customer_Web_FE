import axiosInstance from "../api/axiosInstance";

// Get application Setup List
const getMenuApplicationSetupList = async (
  params,
  url = "categories" //changed because letf menu needed to be handled by user group
) => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

// Get application Setup List
const getApplicationSetupList = async (params, url = "application-setups") => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const menuApplicationSetupService = {
  getMenuApplicationSetupList,
  getApplicationSetupList,
};

export default menuApplicationSetupService;
