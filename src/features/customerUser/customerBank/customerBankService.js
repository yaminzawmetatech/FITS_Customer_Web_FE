import axiosInstance from "../../api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/customer-banks`;
const SYNC_URL = `${base_url}admin/sync-customer-banks`;

const getCustomerBanks = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
}
const customerBankService = {
  getCustomerBanks,
};

export default customerBankService;
