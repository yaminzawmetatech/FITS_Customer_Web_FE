import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}admin/applications`;
const CAPI_URL = `${base_url}admin/cancel-application`;
const SAPI_URL = `${base_url}admin/sync-application`;
const DAPI_URL = `${base_url}admin/delete-applications`;

// Get applications
const getApplication = async (params) => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      ...params,
      limit: +params?.limit || 50,
    },
  });
  return response.data;
};

// Get single application by UUID
const getApplicationByUUID = async (uuid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.get(`${API_URL}/${uuid}`, config);
  return response.data;
};

// Update application
const updateApplication = async (uuid, applicationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.put(
    `${API_URL}/${uuid}`,
    applicationData,
    config
  );
  return response.data;
};

// Cancel application
const cancelApplication = async (uuid, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.post(`${CAPI_URL}/${uuid}`, data, config);
  return response.data;
};

// Sync application
const syncApplication = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.post(SAPI_URL, data, config);
  return response.data;
};


// Delete multiple applications by array of IDs
const deleteApplications = async (ids, token) => {
  if (!ids.length) throw new Error("No IDs provided for deletion");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Axios automatically sends JSON
  const response = await axiosInstance.post(DAPI_URL, { ids }, config);

  return response.data;
};




const applicationService = {
  getApplication,
  getApplicationByUUID,
  updateApplication,
  cancelApplication,
  syncApplication,
  deleteApplications, // ✅ Added multi-delete
};

export default applicationService;
