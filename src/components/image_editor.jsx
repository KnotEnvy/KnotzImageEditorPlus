import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RotationControl from './RotationControl';
import ResolutionControl from './ResolutionControl';
import { BarLoader } from 'react-spinners';
import { processImage, removeWatermark } from '../api/api'; // Update API file to include removeWatermark function
import WatermarkRemovalControl from './WatermarkRemovalControl';

function ImageEditor() {
  const location = useLocation();
  const imageFile = location.state.imageFile;
  const [resolution, setResolution] = useState(100);
  const [processedImage, setProcessedImage] = useState(null);
  // Add rotation state
  const [rotation, setRotation] = useState(0); // Angle in degrees
  const [loading, setLoading] = useState(false);
  const [showWatermarkModal, setShowWatermarkModal] = useState(false);

  const handleRemoveWatermark = async (coordinates) => {
    setShowWatermarkModal(false);
    const result = await removeWatermark(imageFile, coordinates);
    setProcessedImage(result.image);
  };
  

  const handleAdjustResolution = async () => {
    setLoading(true);
    const options = { resolution };
    const result = await processImage(imageFile, options);
    setProcessedImage(result.image);
    setLoading(false);
  };
  const handleApplyEdits = async () => {
    setLoading(true);
    const options = { resolution, rotation }; // Include rotation
    const result = await processImage(imageFile, options);
    setProcessedImage(result.image);
    setLoading(false);
  };
    // Extract filename from processed image URL
    const filename = processedImage ? processedImage.split('/').pop() : '';

  return (
    <div className="card-slide-in shadow-lg rounded-lg p-6 mx-auto w-full max-w-3xl">
      {loading && <BarLoader color="#4A90E2" />}
      <h2 className="card-slide-in text-2xl font-semibold mb-4">Image Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <h3 className="card-slide-in text-xl font-medium mb-2">Original Image</h3>
          <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className="h-64 object-cover rounded" />
        </div>
        {processedImage && (
          <div className="card-slide-in flex flex-col items-center">
            <h3 className="text-xl font-medium mb-2">Processed Image</h3>
            <img src={processedImage} alt="Processed" className="h-64 object-cover rounded" />
            <a href={`http://localhost:8000/download/${filename}`} download className="mt-2 text-blue-500">
              Download
            </a>
          </div>
        )}
      </div>
      <div className="card-slide-in mt-4 flex flex-col items-center md:flex-row md:justify-between  hover:bg-gray-200 p-2 rounded shadow-lg">
        <div className="flex items-center">
            <ResolutionControl value={resolution} onChange={setResolution} />
        </div>
        <button
            onClick={handleAdjustResolution}
            className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-400"
        >
            Adjust Resolution
        </button>
        </div>
        <div className="card-slide-in mt-4 flex flex-col items-center md:flex-row md:justify-between  hover:bg-gray-200 p-2 rounded shadow-lg">
            <div className="flex items-center">
                <RotationControl value={rotation} onChange={setRotation} />
            </div>
            <button
                onClick={handleApplyEdits}
                className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-400"
            >
                Apply Edits
            </button>
        </div>
        <div className="card-slide-in mt-4 flex flex-col items-center md:flex-row md:justify-between hover:bg-gray-200 p-2 rounded shadow-lg">
            <div className="flex items-center">
              Watermark Remover
            </div>
        <button
        onClick={() => setShowWatermarkModal(true)}
        className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-400"
      >
        Remove Watermark
      </button>
      {showWatermarkModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded">
          <WatermarkRemovalControl imageFile={imageFile} onRemoveWatermark={handleRemoveWatermark} />
            <button onClick={() => setShowWatermarkModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      </div>

    </div>
  );
}

export default ImageEditor;
