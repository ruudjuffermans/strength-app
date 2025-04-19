import { Box, Button } from "@mui/material";
import CustomInput from "@components/CustomInput";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
});

const initialValues = {
  email: "",
  firstname: "",
  lastname: "",
};

const Register = ({colors, theme, user, navigate, isMobile, params}) => {

  const {
    register,
  } = useAuth();

  const handleFormSubmit = async (values) => {
    const res = await register(values);
    if (res?.token) {
      localStorage.setItem('token', res.token);
    }
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
                  label="Firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  name="firstname"
                  error={!!touched.firstname && !!errors.firstname}
                  helperText={touched.firstname && errors.firstname}
                  sx={{ gridColumn: "span 4" }}
                />
                <CustomInput
                  type="text"
                  label="Lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  name="lastname"
                  error={!!touched.lastname && !!errors.lastname}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ gridColumn: "span 4" }}
                />
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
                  Register
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  );
};

export default Register;
