import React from 'react';

const ResolutionControl = ({ value, onChange }) => (
  <div className="flex items-center">
    <label className="mr-2">Resolution Adjustment (%): </label>
    <input
      
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-1 text-black"
    />
  </div>
);

export default ResolutionControl;
