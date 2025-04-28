import { Box, Typography } from "@mui/material";
import Button from "@components/buttons/Button";
import BasePaper from "@components/papers/BasePaper";
import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";


const ActivateAccount = ({ colors, theme, navigate, isMobile, searchParams }) => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [activated, setActivated] = useState(false);

  const {activate} = useAuth()

  useEffect(() => {
    if (searchParams.code) {
      setCode(searchParams.code);
    }
  }, [searchParams]);

  const handleActivate = () => {
    // Here you would normally send the code to your backend to activate
    console.log("Activating account with code:", code);
    activate({code})
    setActivated(true);
  };

  return (
    <Box m={isMobile ? "10px" : "20px"}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <BasePaper
          sx={{
            width: isMobile ? "90%" : 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          {!activated ? (
            <>
              <Typography variant="h5" mb={2}>
                Activate Your Account
              </Typography>
              <Typography mb={3}>
                Hey {email ? email : "there"}, please confirm your email address by clicking below.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                label="Confirm Email Address"
                onClick={handleActivate}
                fullWidth
              />
            </>
          ) : (
            <>
              <Typography variant="h5" mb={2}>
                Account Activated!
              </Typography>
              <Typography mb={3}>
                Your email address has been successfully confirmed. You can now log in.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                label="Go to Login"
                onClick={() => navigate("/login")}
                fullWidth
              />
            </>
          )}
        </BasePaper>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
