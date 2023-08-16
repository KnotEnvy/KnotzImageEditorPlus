import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const processImage = async (imageFile, options) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('options', JSON.stringify(options));

  const response = await axios.post(`${API_URL}/process`, formData);
  return response.data;
};
