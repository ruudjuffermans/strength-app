import React from 'react';
import { ButtonBase, Typography, useMediaQuery } from '@mui/material';

const TextButton = ({ text, onClick, style }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <ButtonBase onClick={onClick} sx={{ all: 'unset', textTransform: 'unset', cursor: 'pointer' }}>
      <Typography
        variant="button"
        fontSize={isMobile ? "12px" : "14px"}
        style={style}
        sx={{
          fontWeight: 500,
          textTransform: 'unset',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          textDecorationThickness: "1px",
          textDecorationColor: "grey",
          opacity: 0.8,
          '&:hover': { opacity: 1 }, 
        }}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default TextButton;
