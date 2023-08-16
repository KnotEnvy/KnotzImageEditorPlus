import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { processImage } from '../api/api';

function ImageEditor() {
  const location = useLocation();
  const imageFile = location.state.imageFile;
  const [resolution, setResolution] = useState(100);
  const [processedImage, setProcessedImage] = useState(null);

  const handleAdjustResolution = async () => {
    const options = { resolution };
    const result = await processImage(imageFile, options);
    setProcessedImage(result.image);
  };
    // Extract filename from processed image URL
    const filename = processedImage ? processedImage.split('/').pop() : '';

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Image Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-medium mb-2">Original Image</h3>
          <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className="h-64 object-cover rounded" />
        </div>
        {processedImage && (
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-medium mb-2">Processed Image</h3>
            <img src={processedImage} alt="Processed" className="h-64 object-cover rounded" />
            <a href={`http://localhost:8000/download/${filename}`} download className="mt-2 text-blue-500">
              Download
            </a>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex items-center">
          <label className="mr-2">Resolution Adjustment (%): </label>
          <input
            type="number"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="border rounded p-1 w-20"
          />
        </div>
        <button
          onClick={handleAdjustResolution}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Adjust Resolution
        </button>
      </div>
    </div>
  );
}

export default ImageEditor;
