import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/categories`;

const getProjectCategory = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

const getMobCategories = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      mob_status: 1,
    },
  });
  return response.data;
};

const deleteProjectCategory = async (projectcategoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(
    API_URL + "/" + projectcategoryId,
    config
  );

  return response.data;
};

const updateProjectCategory = async (
  projectcategoryId,
  projectcategoryData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    API_URL + "/" + projectcategoryId,
    projectcategoryData,
    config
  );

  return response.data;
};

const createProjectCategory = async (projectcategoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, projectcategoryData, config);

  return response.data;
};

const batchDeleteProjectCategory = async (projectcategoryIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    API_URL + "/batch-delete",
    projectcategoryIds,
    config
  );

  return response.data;
};

const projectcategoryService = {
  createProjectCategory,
  getProjectCategory,
  deleteProjectCategory,
  updateProjectCategory,
  batchDeleteProjectCategory,
  getMobCategories
};

export default projectcategoryService;
