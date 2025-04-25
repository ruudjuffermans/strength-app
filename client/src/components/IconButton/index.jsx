import React from 'react';
import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import BasicTooltip from '../BasicTooltip';
import clsx from 'clsx';

const StyledIconButton = styled(MuiIconButton)(({ theme, ownerState }) => ({
  backgroundColor: ownerState.backgroundColor || 'transparent',
  borderRadius: theme.spacing(ownerState.borderRadius ?? 1),
  color: ownerState.color || 'inherit',
  width: typeof ownerState.size === 'number' ? ownerState.size : undefined,
  height: typeof ownerState.size === 'number' ? ownerState.size : undefined,
  fontSize:
    typeof ownerState.size === 'number' ? `${ownerState.size * 0.5}px` : undefined,
  transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.1s',

  '&:hover': {
    backgroundColor: theme.palette.colors.contrast[400],
  },
  '&:active': {
    transform: 'scale(0.95)',
    backgroundColor: "unset",
    // boxShadow: `0 2px 8px ${theme.palette.action.selected}`,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.colors.contrast[400],
    // color: "red",
  },
}));

const CustomIconButton = ({
  id,
  onClick,
  disabled = false,
  tooltip,
  size = 'small',
  backgroundColor = 'transparent',
  color = 'inherit',
  borderRadius = 1,
  className,
  children,
  sx = {},
  ...rest
}) => {
  const ownerState = { size, backgroundColor, color, borderRadius };

  const button = (
    <StyledIconButton
      id={id}
      onClick={onClick}
      disabled={disabled}
      ownerState={ownerState}
      className={clsx('custom-icon-button', className)}
      sx={{ ...sx }}
      {...rest}
    >
      {children}
    </StyledIconButton>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <BasicTooltip title={tooltip}>
      {button}
    </BasicTooltip>
  );
};

export default CustomIconButton;
