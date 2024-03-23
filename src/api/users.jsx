import axiosInstance from ".";

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_URL}/user/register`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_URL}/user/login`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_URL}/user/get-user-info`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
