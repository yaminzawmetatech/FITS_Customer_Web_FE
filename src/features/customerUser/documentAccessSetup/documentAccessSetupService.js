import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/document-access`; // Replace with your actual endpoint

// ✅ Get all document access setups (with optional params)
const getDocumentAccessSetups = async (token, params = {}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // 👈 This allows passing query parameters like ?page=1&limit=10
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

const documentAccessSetupService = {
  getDocumentAccessSetups,
};

export default documentAccessSetupService;
