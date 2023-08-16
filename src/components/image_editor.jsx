import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { processImage } from '../api/api';

function ImageEditor() {
  const location = useLocation();
  const imageFile = location.state.imageFile;
  const [resolution, setResolution] = useState(100); // Percentage
  const [processedImage, setProcessedImage] = useState(null);

  const handleAdjustResolution = async () => {
    const options = { resolution };
    const result = await processImage(imageFile, options);
    setProcessedImage(result.image);
  };

  // Extract filename from processed image URL
  const filename = processedImage ? processedImage.split('/').pop() : '';

  return (
    <div style={{ display: 'flex' }}>
      <img src={URL.createObjectURL(imageFile)} alt="Uploaded" />
      {processedImage && (
        <div>
          <img src={processedImage} alt="Processed" />
          <a href={`http://localhost:8000/download/${filename}`} download>
            Download
          </a>
        </div>
      )}
      <div>
        <label>Resolution Adjustment (%): </label>
        <input
          type="number"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
        />
        <button onClick={handleAdjustResolution}>Adjust Resolution</button>
      </div>
    </div>
  );
}

export default ImageEditor;
