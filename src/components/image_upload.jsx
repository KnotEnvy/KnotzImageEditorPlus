import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ImageUpload() {
  const [imageFile, setImageFile] = useState(null);
  const history = useHistory();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleImageUpload = () => {
    history.push('/editor', { imageFile });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
      <div className="flex flex-col items-center">
        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-400">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          Select Image
        </label>
        {imageFile && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="h-32 w-32 object-cover rounded"
            />
          </div>
        )}
        <button
          onClick={handleImageUpload}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
          disabled={!imageFile}
        >
          Continue to Editor
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
