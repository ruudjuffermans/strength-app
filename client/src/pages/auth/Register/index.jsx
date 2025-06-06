import { Box } from "@mui/material";
import CustomInput from "@components/CustomInput";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useAuth } from "@context/AuthContext";
import Button from "@components/buttons/Button";
import InfoDialog from "../../../components/dialogs/InfoDialog";

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
});

const initialValues = {
  email: "",
  firstname: "",
  lastname: ""
};

const Register = ({ colors, theme, user, navigate, isMobile, params }) => {

  const { register } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      await register(values);
      setOpenDialog(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>

    <Box sx={!isMobile ? { minWidth: "500px" } : { height: "100%" }} p={4}>
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
              <Button label={"Register"} type="submit" color="secondary" variant="contained" />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    <InfoDialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  title="Registration Successful"
  message="Your account has been registered and is awaiting review. Once approved by an administrator, you will receive an email containing your login password."
  confirmLabel="Go to Login"
  onConfirm={() => navigate("/login")}
/>
    </>
  );
};

export default Register;
