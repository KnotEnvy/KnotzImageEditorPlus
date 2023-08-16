import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ImageUpload() {
  const [imageFile, setImageFile] = useState(null);
  const history = useHistory();

  const handleUpload = () => {
    // Redirect to the editor page with the image
    history.push('/editor', { imageFile });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
