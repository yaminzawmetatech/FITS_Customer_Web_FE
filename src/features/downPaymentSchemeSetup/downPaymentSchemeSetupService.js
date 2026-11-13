import { get } from "lodash";
import axiosInstance from "../api/axiosInstance";

const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}admin/downpayment-setups`;

// Get survey name
const getDownPayment = async (access_token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);

  return response.data;
};

// ✅ Get DownPayments with query params (e.g., pagination, filter, search)
const getDownPaymentWithParams = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // axios will append these as query string
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};


// Delete survey name
const deleteDownPayment = async (downPaymentSchemeCode, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axiosInstance.delete(
      API_URL + "/" + downPaymentSchemeCode,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateDownPayment = async (
  downPaymentSchemeCode,
  downPaymentData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.put(
    API_URL + "/" + downPaymentSchemeCode,
    downPaymentData,
    config
  );

  return response.data;
};

// Create new survery header
const createDownPayments = async (downPaymentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance.post(API_URL, downPaymentData, config);
    return response.data;
  } catch (error) {
    console.error("response Error creating down payments:", error);
    throw error; // You might want to handle errors appropriately
  }
};

const downPaymentSchemeSetupService = {
  createDownPayments,
  getDownPayment,
  deleteDownPayment,
  updateDownPayment,
  getDownPaymentWithParams,
};

export default downPaymentSchemeSetupService;
