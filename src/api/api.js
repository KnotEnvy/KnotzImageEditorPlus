import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export const processImage = async (imageFile, options) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('options', JSON.stringify(options));

  // Use axios for both functions
  const response = await axios.post(`${API_URL}/process`, formData);
  return response.data;
};

export const removeWatermark = async (imageFile, coordinates) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('coordinates', JSON.stringify(coordinates));

  // Use axios for both functions
  const response = await axios.post(`${API_URL}/remove_watermark`, formData);
  return response.data;
};
