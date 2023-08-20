import React from 'react';

function RotationControl({ value, onChange }) {
  return (
    <div className="flex items-center">
      <label className="mr-2">Rotation (Degrees): </label>
      <input
        className="border rounded p-1 text-black"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min="0"
        max="360"
        step="1"
      />
    </div>
  );
}

export default RotationControl;
