import React from 'react';
import { Typography } from '@mui/material';

function GaugeChart({ value, label, min, max }) {
  const percentage = ((value - min) / (max - min)) * 100;
  const color = percentage > 80 ? '#f44336' : percentage > 60 ? '#ff9800' : '#4caf50';

  return (
    <div className="flex flex-col items-center">
      <Typography variant="h6" sx={{ mb: 2 }}>{label}</Typography>
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          {/* Value arc */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${percentage * 1.25} 125`}
            // transform="rotate(180 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Typography variant="h4" component="div">
            {Math.round(value)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default GaugeChart; 