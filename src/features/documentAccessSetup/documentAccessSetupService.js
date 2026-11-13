import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}admin/document-access`; // Replace with your actual endpoint
const DAPI_URL = `${base_url}document-types`;

// ✅ Get all document access setups
const getDocumentAccessSetups = async (token, params ={}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

// ✅ Get active document access setups (status = 1)
const getActiveDocumentAccessSetups = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};

// ✅ Create new document access setup
const createDocumentAccessSetup = async (documentAccessData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, documentAccessData, config);
  return response.data;
};

// ✅ Update existing document access setup
const updateDocumentAccessSetup = async (id, documentAccessData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${id}`,
    documentAccessData,
    config
  );
  return response.data;
};

// ✅ Delete document access setup
const deleteDocumentAccessSetup = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// ✅ Get all document access setups
const getDocumentTypes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(DAPI_URL, config);
  return response.data;
};

const documentAccessSetupService = {
  getDocumentAccessSetups,
  getActiveDocumentAccessSetups,
  createDocumentAccessSetup,
  updateDocumentAccessSetup,
  deleteDocumentAccessSetup,
  getDocumentTypes,
};

export default documentAccessSetupService;
