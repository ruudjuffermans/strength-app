import React from 'react';
import { ButtonBase, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BasicTooltip from "../BasicTooltip";
import { runWithoutPropagation } from "@utils/util";
import clsx from "clsx";
import _ from "lodash";

const TextButton = React.forwardRef((props, ref) => {
  const {
    id, onClick, disabled, label, className, to, Icon, tooltip, type,
    disableAutoFocus = false,
  } = props;

  if (_.sum([to, onClick]) > 1) {
    throw new Error("TextButton can either behave as clickable button or as link, but not both!");
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const button = (
    <ButtonBase
      id={id}
      ref={ref}
      onClick={runWithoutPropagation(to ? () => navigate(to) : onClick)}
      disabled={disabled}
      type={type}
      disableRipple
      sx={{ all: 'unset', cursor: disabled ? 'default' : 'pointer' }}
      autoFocus={!disableAutoFocus}
      className={clsx("text-button", className)}
    >
      <Typography
        variant="button"
        sx={{
          fontWeight: 500,
          textTransform: 'unset',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          textDecorationThickness: "1px",
          textDecorationColor: "grey",
          opacity: disabled ? 0.5 : 0.8,
          '&:hover': { opacity: disabled ? 0.5 : 1 },
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {Icon && <Icon fontSize="small" />}
        <span className="label">{label}</span>
      </Typography>
    </ButtonBase>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <BasicTooltip title={tooltip}>
      {button}
    </BasicTooltip>
  );
});

export default React.memo(TextButton);
