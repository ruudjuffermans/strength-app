import React, { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import IconButton from "@components/buttons/IconButton";
import Icon from "@components/Icon";

const OptionsMenu = ({ options = [], triggerButton = null }) => {
  const theme = useTheme()
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
        <IconButton size={"small"} icon={"options"} onClick={handleMenuOpen} />
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,1%)",
            

          },
          "& .MuiList-root": {
            backgroundColor: theme.palette.background.paper,
            borderRadius: 0,
          },
        }}
      >
        {options.map(({ label, icon, onClick }, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(onClick)}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.background[100],
              },
              padding: 2,
            }}>
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
