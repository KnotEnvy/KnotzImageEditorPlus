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
    <div className="shadow-lg rounded-lg p-6 mx-auto w-full max-w-md">
      <h2 className="card-slide-in text-2xl font-semibold mb-4">Upload Image</h2>
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
          <div className="card-slide-in mt-4 bg-gray-100 p-2 rounded flex justify-center items-center" style={{ width: '300px', height: '300px' }}>
          {imageFile ? (
            <img src={URL.createObjectURL(imageFile)} alt="Preview" className="object-cover rounded" />
          ) : (
            <span className="text-gray-400">Preview</span>
          )}
        </div>
        
        )}
        <button
          onClick={handleImageUpload}
          className="card-slide-in mt-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
          disabled={!imageFile}
        >
          Continue to Editor
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
