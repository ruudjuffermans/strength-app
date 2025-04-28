import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@components/buttons/Button";;

const navItems = [
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
  { label: "Forgot Password", path: "/forgot-password" },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={2}
      p={2}
      sx={{ borderTop: "1px solid", borderColor: "divider" }}
    >
      {navItems
        .filter(item => item.path !== location.pathname)
        .map(item => (
          <Button
            key={item.path}
            variant="text"
            label={item.label}
            onClick={() => navigate(item.path)}
          />
        ))}
    </Box>
  );
};

export default Navigation;
