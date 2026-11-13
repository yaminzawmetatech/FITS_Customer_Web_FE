import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}questions`;

// ✅ Get all FAQ questions
const getFAQQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

// ✅ Get active FAQ questions (optional)
const getActiveFAQQuestions = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};

// ✅ Create new FAQ question
const createFAQQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, questionData, config);
  return response.data;
};

// ✅ Update existing FAQ question
const updateFAQQuestion = async (questionId, questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${questionId}`,
    questionData,
    config
  );
  return response.data;
};

// ✅ Delete FAQ question
const deleteFAQQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(`${API_URL}/${questionId}`, config);
  return response.data;
};

const faqQuestionService = {
  getFAQQuestions,
  getActiveFAQQuestions,
  createFAQQuestion,
  updateFAQQuestion,
  deleteFAQQuestion,
};

export default faqQuestionService;
