import React from 'react';
import icons from '@icons';
import { useTheme } from '@mui/material/styles';

const Icon = ({
  name,
  color = 'inherit',
  size = 'medium',
  bold = false,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  const fontSize = typeof size === 'string' ? size : undefined;
  const customFontSize = typeof size === 'number' ? size : undefined;

  return (
    <IconComponent
      color={color}
      fontSize={fontSize} // MUI: small | medium | large
      sx={{
        fontWeight: bold ? 600 : 400,
        fontSize: customFontSize, // If using pixel size
        ...sx,
      }}
      {...props}
    />
  );
};

export default Icon;
