import { Box } from "@mui/material";
import CustomInput from "@components/CustomInput";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAuth } from "@context/AuthContext";
import Button from "@components/buttons/Button";

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ colors, theme, user, navigate, isMobile, params }) => {
  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    const res = await login(values);
    if (res) {
      navigate("/");
    }
  };

  return (
    <Box sx={{ minWidth: "100%" }} p={4}>
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
              <Button label={"login"} type={"submit"} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
