import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const processImage = async (imageFile, options) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('options', JSON.stringify(options));

  const response = await axios.post(`${API_URL}/process`, formData);
  return response.data;
};

export const removeWatermark = async (imageFile, coordinates) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('coordinates', JSON.stringify(coordinates));

  const response = await fetch('http://localhost:8000/remove_watermark', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return result;
};

