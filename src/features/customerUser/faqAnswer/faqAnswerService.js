import axiosInstance from "../../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}user/answers`; // Replace with your actual endpoint

// ✅ Get all FAQ answers
const getFAQAnswers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

// ✅ Get active FAQ answers (optional)
const getActiveFAQAnswers = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};

// ✅ Create new FAQ answer
const createFAQAnswer = async (answerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, answerData, config);
  return response.data;
};

// ✅ Update existing FAQ answer
const updateFAQAnswer = async (answerId, answerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${answerId}`,
    answerData,
    config
  );
  return response.data;
};

// ✅ Delete FAQ answer
const deleteFAQAnswer = async (answerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${answerId}`, config);
  return response.data;
};

const faqAnswerService = {
  getFAQAnswers,
  getActiveFAQAnswers,
  createFAQAnswer,
  updateFAQAnswer,
  deleteFAQAnswer,
};

export default faqAnswerService;
