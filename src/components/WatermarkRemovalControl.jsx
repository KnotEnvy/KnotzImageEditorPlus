import React, { useRef, useState } from 'react';

function WatermarkRemovalControl({ imageFile, onRemoveWatermark }) {
  const [selection, setSelection] = useState(null);
  const imageRef = useRef(null);

  const handleMouseDown = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelection({ startX: x, startY: y });
  };

  const handleMouseUp = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const coordinates = {
      x: selection.startX,
      y: selection.startY,
      width: x - selection.startX,
      height: y - selection.startY,
    };
    onRemoveWatermark(coordinates);
  };

  return (
    <div>
      <img
        ref={imageRef}
        src={URL.createObjectURL(imageFile)} // imageFile is now accessible
        alt="Original"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="cursor-square"
      />
      <p>Click and drag on the image to select the watermark area.</p>
    </div>
  );
}

export default WatermarkRemovalControl;
