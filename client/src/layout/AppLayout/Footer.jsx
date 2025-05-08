import { Box, useTheme } from '@mui/material'
import React from 'react'

const Footer = () => {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Box sx={{backgroundColor: colors.background.paper}} minHeight={100} mt={8} borderTop={"1px solid rgba(255,255,255,8%)"} ></Box>
  )
}

export default Footer