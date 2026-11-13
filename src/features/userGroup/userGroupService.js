import axiosInstance from "features/api/axiosInstance"
const base_url = import.meta.env.VITE_API_URL

const API_URL = `${base_url}user-groups`

// Get user groups
const getUserGroups = async () => {

  const response = await axiosInstance.get(API_URL)
  return response.data
}

// Delete user group
const deleteUserGroup = async (userGroupId) => {

  const response = await axiosInstance.delete(API_URL +'/'+ userGroupId)
  return response.data
}

const updateUserGroup = async(userGroupId, userGroupData) => {

  const response = await axiosInstance.put(API_URL +'/'+userGroupId, userGroupData)
  return response.data;
}

const getUserGroupByUuid = async(userGroupId) => {

  const response = await axiosInstance.get(API_URL +'/'+userGroupId)
  return response.data;
}

// Create new user group
const createUserGroup = async (userGroupData) => {

  const response = await axiosInstance.post(API_URL, userGroupData)
  return response.data
}


const batchDeleteUserGroups = async (userGroupIds) => {

  const response = await axiosInstance.post(API_URL+'/batch-delete', userGroupIds)
  return response.data
}


const userGroupService = {
  createUserGroup,
  getUserGroups,
  deleteUserGroup,
  updateUserGroup,
  batchDeleteUserGroups,
  getUserGroupByUuid
}


export default userGroupService
