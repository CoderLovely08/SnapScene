import axiosInstance from "@/core/axios";

export const handleGetRequest = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const handlePostRequest = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const handlePutRequest = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const handleDeleteRequest = async (url, data) => {
  try {
    const response = await axiosInstance.delete(url, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
