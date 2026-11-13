
// Get application information setup
// const getApplicationInformationSetupProperties = async () => {
//   return await new Promise((resolve) =>
//     setTimeout(
//       () => resolve({ data: ApplicationInformationSetupPropertyData }),
//       0
//     )
//   );
// };

import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL
//const base_url = "http://127.0.0.1:8000/api/"

const API_URL = `${base_url}user/application-fields`
const APPLICATIONSETUP_URL = `${base_url}user/application-field-set-up`

const getApplicationSetupList = async (params = {}) => {
  const response = await axiosInstance.get(APPLICATIONSETUP_URL, params)
  return response.data
}

const createApplicationInformationSetup = async (applicationSetupData) => {
  const response = await axiosInstance.post(APPLICATIONSETUP_URL, applicationSetupData)
  return response.data
}

const updateApplicationInformationSetup = async (uuid, applicationSetupData) => {

  const response = await axiosInstance.put(APPLICATIONSETUP_URL + `/${uuid}`, applicationSetupData)
  return response.data;
}

const getApplicationInformationSetupProperties = async () => {
  const response = await axiosInstance.get(API_URL)
  return response.data
}

const applicationInformationSetupService = {
  getApplicationSetupList,
  createApplicationInformationSetup,
  getApplicationInformationSetupProperties,
  updateApplicationInformationSetup
};

export default applicationInformationSetupService;
