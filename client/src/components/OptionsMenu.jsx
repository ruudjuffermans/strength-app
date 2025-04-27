import React, { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import CustomIconButton from "./IconButton";
import Icon from "./Icon";

const OptionsMenu = ({ options = [], triggerButton = null }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (onClick) => {
    onClick();
    handleMenuClose();
  };

  return (
    <>
      {triggerButton ? (
        React.cloneElement(triggerButton, { onClick: handleMenuOpen })
      ) : (
        <CustomIconButton size="small" onClick={handleMenuOpen}>
          <Icon size="small" name="options" />
        </CustomIconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options.map(({ label, icon, onClick }, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(onClick)}>
            <ListItemIcon>
              <Icon name={icon} fontSize="small" />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default OptionsMenu;
