import { Box, useMediaQuery } from "@mui/material";
import CustomButton from "@components/CustomButton";
import CustomInput from "@components/CustomInput";
import CustomPaper from "@components/CustomPaper";
import Header from "@components/Header";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <CustomPaper sx={isNonMobile? {minWidth: "500px"} : {height: "100%"}}>
      <Box p={4}>
        <Header title="Login" />
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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                <CustomInput
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <CustomButton type="submit" color="primary" variant="contained">
                  Login
                </CustomButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </CustomPaper>
  );
};

export default Login;
