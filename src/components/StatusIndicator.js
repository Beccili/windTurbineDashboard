import React from 'react';
import { Box, Typography } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';

function StatusIndicator({ status }) {
  const color = status === 'NORMAL' ? 'success.main' : 'error.main';
  const text = status === 'NORMAL' ? 'Normal Operation' : 'Fault Detected';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <FiberManualRecord sx={{ color }} />
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
}

export default StatusIndicator; 