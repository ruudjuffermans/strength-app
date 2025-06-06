import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Typography, Box } from '@mui/material';
import clsx from 'clsx';

const StyledInputBase = styled(InputBase)(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[800] ,
  borderRadius: theme.spacing(ownerState.borderRadius ?? 1),
  color: 'rgba(255,255,255,60%)',
  fontWeight: "400",
  padding: theme.spacing(1, 2),
  width: '100%',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
  },
  // '&.Mui-disabled': {
  //   backgroundColor: theme.palette.action.disabledBackground,
  //   color: theme.palette.text.disabled,
  // },
  // '&.error': {
  //   border: `1px solid ${theme.palette.error.main}`,
  // }
}));

const CustomInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  disabled = false,
  placeholder = '',
  type = 'text',
  backgroundColor = 'transparent',
  color = 'inherit',
  fontSize,
  borderRadius = 1,
  paddingX,
  paddingY,
  className,
  label,
  error,
  helperText,
  sx = {},
  ...rest
}) => {
  const ownerState = { backgroundColor, color, fontSize, borderRadius, paddingX, paddingY };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', ...sx }}>
      {label && (
        <Typography
          variant="body2"
          sx={{ mb: 0.5, ml: 0.5, color: error ? 'error.main' : 'text.primary' }}
        >
          {label}
        </Typography>
      )}
      <StyledInputBase
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        ownerState={ownerState}
        className={clsx('custom-input', className, error && 'error')}
        {...rest}
      />
      {helperText && (
        <Typography
          variant="caption"
          sx={{ mt: 0.5, ml: 0.5, color: error ? 'error.main' : 'text.secondary' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CustomInput;
