import React from 'react';

function RotationControl({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min="0"
      max="360"
      step="1"
    />
  );
}

export default RotationControl;
