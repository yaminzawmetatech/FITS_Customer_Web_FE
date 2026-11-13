import axiosInstance from "../../features/api/axiosInstance";

const base_url = import.meta.env.VITE_API_URL
//const base_url = "http://127.0.0.1:8000/api/"

const API_URL = `${base_url}admin/application-field-set-up`

// Get user groups
const getApplicationSetupList = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

const applicationInfrmationSetupListService = {
  getApplicationSetupList,
}


export default applicationInfrmationSetupListService
