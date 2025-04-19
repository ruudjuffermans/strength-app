import { Box, Button } from "@mui/material";
import CustomInput from "@components/CustomInput";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

const ForgotPassword = ({colors, theme, user, navigate, isMobile, params}) => {

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
      <Box sx={!isMobile? {minWidth: "500px"} : {height: "100%"}} p={4}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
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
                width={"100%"}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isMobile ? undefined : "span 4" },
                }}
              >
                <CustomInput
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  );
};

export default ForgotPassword;
