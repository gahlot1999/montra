import axiosInstance from './axios';

export const getRequest = async ({ url, params = {} }) => {
  try {
    const res = await axiosInstance.get(url, { params });
    return res.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axiosInstance.post(url, data, { params });
    return res.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const patchRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axiosInstance.patch(url, data, { params });
    return res.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const putRequest = async ({ url, data = {}, params = {} }) => {
  try {
    const res = await axiosInstance.put(url, data, { params });
    return res.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteRequest = async ({ url, params = {} }) => {
  try {
    const res = await axiosInstance.delete(url, { params });
    return res.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
