import React from 'react';
import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import BasicTooltip from '../BasicTooltip';
import clsx from 'clsx';
import Icon from '../Icon';

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
    backgroundColor: theme.palette.background[600],
  },
  '&:active': {
    transform: 'scale(0.95)',
    backgroundColor: "unset",
  },
  "&.Mui-disabled": {
    opacity: 1,                 // Restore full opacity
    color: "unset", // Or any specific color
    pointerEvents: "auto",      // Allow clicks if you want (use with care)
    cursor: "pointer",          // Optional, show pointer
  },
}));

const IconButton = ({
  id,
  icon,
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
  const ownerState = { size, icon, backgroundColor, color, borderRadius };

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
      <Icon name={icon} size={size} />
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

export default IconButton;
