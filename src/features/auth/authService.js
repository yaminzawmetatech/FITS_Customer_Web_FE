// import axios from 'axios'
// import axiosInstance from "../api/axiosInstance";

// const API_URL =  import.meta.env.VITE_API_URL;

// // Login user
// const login = async (userData) => {

//   const response = await axiosInstance.post(API_URL + 'login', userData)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

//   return response.data
// }

// // Logout user
// const logout = () => {
//   localStorage.removeItem('user')
// }

// const authService = {
//   logout,
//   login,
// }

// export default authService


import axiosInstance from "../api/axiosInstance";
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    Cookies.set("jwt_authorization", response.data.access_token);
  }

  return response.data;
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  Cookies.remove("jwt_authorization");
}

const authService = {
  logout,
  login,
}

export default authService;
