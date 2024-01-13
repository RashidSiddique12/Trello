import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingElement() {
  return (
    <Box sx={{ display: 'flex' }}  className = "handler">
    <CircularProgress />
  </Box>
  )
}

export default LoadingElement
