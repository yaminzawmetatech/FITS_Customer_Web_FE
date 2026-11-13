import axiosInstance from "../../features/api/axiosInstance";
const base_url = import.meta.env.VITE_API_URL;

const API_URL = `${base_url}admin/apply-loan-steps`;

// ✅ Get all loan steps
const getApplyLoanSteps = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

// ✅ Get active loan steps (if needed, e.g., with status filter)
const getActiveLoanSteps = async () => {
  const response = await axiosInstance.get(API_URL, {
    params: {
      status: 1,
    },
  });
  return response.data;
};

// ✅ Create new loan step
const createApplyLoanStep = async (loanStepData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, loanStepData, config);
  return response.data;
};

// ✅ Update existing loan step
const updateApplyLoanStep = async (loanStepId, loanStepData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${loanStepId}`,
    loanStepData,
    config
  );
  return response.data;
};

// ✅ Delete loan step
const deleteApplyLoanStep = async (loanStepId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(
    `${API_URL}/${loanStepId}`,
    config
  );
  return response.data;
};

// ✅ Batch delete loan steps
const batchDeleteApplyLoanSteps = async (loanStepIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(
    `${API_URL}/batch-delete`,
    loanStepIds,
    config
  );
  return response.data;
};

const applyLoanStepService = {
  getApplyLoanSteps,
  getActiveLoanSteps,
  createApplyLoanStep,
  updateApplyLoanStep,
  deleteApplyLoanStep,
  batchDeleteApplyLoanSteps,
};

export default applyLoanStepService;
