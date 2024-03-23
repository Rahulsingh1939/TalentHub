import axiosInstance from ".";

// add report
export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_URL}/report/add-report`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all reports
export const getAllReports = async (filters) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_URL}/report/get-all-reports`,
      filters
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all reports by user
export const getAllReportsByUser = async () => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_URL}/report/get-all-reports-by-user`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
