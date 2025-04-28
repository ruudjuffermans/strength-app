import { Box, Button } from "@mui/material";
import CustomInput from "@components/CustomInput";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAuth } from "@context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const resetSchema = yup.object().shape({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = ({ colors, theme, isMobile }) => {
  const { resetPassword } = useAuth(); // (We'll add this function in AuthContext)
  const { token } = useParams(); // 🔥 Grabs reset token from URL
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { resetForm }) => {
    if (!token) {
      console.error("Missing token");
      return;
    }

    const success = await resetPassword(token, values.password);
    if (success) {
      resetForm();
      navigate("/login"); // ✅ Go back to login after reset
    }
  };

  return (
    <Box sx={!isMobile ? { minWidth: "500px" } : { height: "100%" }} p={4}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={resetSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              width="100%"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isMobile ? undefined : "span 4" },
              }}
            >
              <CustomInput
                type="password"
                label="New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <CustomInput
                type="password"
                label="Confirm New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Reset Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPassword;
