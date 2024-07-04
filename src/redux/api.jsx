import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const apiRequest = async (url, method, data = null) => {
  const config = {
    method: method,
    url: `${backendUrl}${url}`,
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default apiRequest;