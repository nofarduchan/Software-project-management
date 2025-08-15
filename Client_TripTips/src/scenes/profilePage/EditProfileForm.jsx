import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom"; // מייבא את useNavigate לניווט



const emailValidationSchema = yup
  .string()
  .email("Invalid email address")
  .matches(/^[^\s@]+@[^\s@]+\.(com|net|org|co\.il|ac\.il)$/, "Invalid email format. Must end with .com, .net, .org, .co.il, or .ac.il with at least two characters after the dot.")
  .required("Required");

const passwordValidationSchema = yup
  .string()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password must include at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.")
  .required("Required");

const phoneValidationSchema = yup
  .string()
  .matches(/^05\d{8}$/, "Phone number must be in the format 05XXXXXXXXXX with 10 digits")
  .required("Required");

const editProfileSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  phoneNumber: phoneValidationSchema,
  picture: yup.mixed().required("Required"),
});

const EditProfileForm = ({ open, handleClose, currentUser, onSave }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = useSelector((state) => state.token);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false); // State for delete confirmation dialog

  const initialValues = {
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    location: currentUser.location || "",
    occupation: currentUser.occupation || "",
    phoneNumber: currentUser.phoneNumber || "",
    password: "",
    confirmPassword: "",
    picture: currentUser.picturePath || "anonymous.jpg",
  };

  const { palette } = useTheme();
  const navigate = useNavigate(); // חיבור לפונקציית הניווט


  const updateUser = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await fetch(`https://server-triptips.onrender.com/auth/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onSave(updatedUser);
        onSubmitProps.resetForm();
        handleClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setOpenSnackbar(true); // Open Snackbar on error
        console.error("Failed to update profile:", errorData.message);
      }
    } catch (error) {
      setErrorMessage("Error updating profile. Please try again.");
      setOpenSnackbar(true); // Open Snackbar on error
      console.error("Error updating profile:", error);
    }
  };

  const deleteUserAccount = async () => {
      try {
        const response = await fetch(`https://server-triptips.onrender.com/auth/${currentUser._id}/deletePosts`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          console.log("Posts deleted successfully");
          // בצע פעולה נוספת אם נדרש, כמו רענון הדף או עדכון מצב הלקוח
          try {
            console.log("id: ", currentUser._id);
            console.log("token", token);
            const response = await fetch(`https://server-triptips.onrender.com/auth/${currentUser._id}/deleteUser`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            if (response.ok) {
              handleClose();
              navigate("/");
            } else {
              const errorData = await response.json();
              setErrorMessage(errorData.message);
              setOpenSnackbar(true); // Open Snackbar on error
              console.error("Failed to delete account:", errorData.message);
            }
          } catch (error) {
            setErrorMessage("Error deleting account. Please try again.");
            setOpenSnackbar(true); // Open Snackbar on error
            console.error("Error deleting account:", error);
          }
        } else {
          const errorData = await response.json();
          console.error("Failed to delete posts:", errorData.message);
          // הצג הודעת שגיאה ללקוח אם נדרש
        }
      } catch (error) {
        console.error("Error deleting posts:", error);
        // הצג הודעת שגיאה ללקוח אם נדרש
      }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Profile
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={updateUser}
          initialValues={initialValues}
          validationSchema={editProfileSchema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            setFieldError,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="First Name"
                  onBlur={(e) => {
                    handleBlur(e);
                    setFieldTouched("firstName", true, true);
                  }}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldError("firstName", undefined);
                  }}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={(e) => {
                    handleBlur(e);
                    setFieldTouched("lastName", true, true);
                  }}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldError("lastName", undefined);
                  }}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Email"
                  onBlur={(e) => {
                    handleBlur(e);
                    setFieldTouched("email", true, true);
                  }}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldError("email", undefined);
                  }}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={(e) => {
                    handleBlur(e);
                    setFieldTouched("phoneNumber", true, true);
                  }}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldError("phoneNumber", undefined);
                  }}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Confirm Password"
                  onBlur={(e) => {
                    handleBlur(e);
                    setFieldTouched("confirmPassword", true, true);
                  }}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldError("confirmPassword", undefined);
                  }}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <FlexBetween>
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ cursor: "pointer" }}
                          width="100%"
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      </FlexBetween>
                    )}
                  </Dropzone>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" mt="2rem">
              <Button
    type="submit"
    variant="contained"
    color="primary"
    sx={{
      backgroundColor: (theme) => theme.palette.primary.dark,
      "&:hover": { backgroundColor: (theme) => theme.palette.primary.main },
      color: "white", // צבע הכתב לבן
      width: "50%", // מרכזי את הכפתור
      fontSize: "0.9rem", // גודל טקסט גדול יותר
      padding: "0.3rem 1.3rem", // padding נוסף להגדלה
    }}
  >
    Save Changes
  </Button>
</Box>


            </form>
          )}
        </Formik>
        <Box display="flex" justifyContent="center" mt="1rem">
  <Typography
    onClick={() => setOpenConfirmDelete(true)} // Open confirmation dialog
    sx={{
      color: "red",
      cursor: "pointer",
      textDecoration: "underline",
      width: "50%",
      textAlign: "center",
    }}
  >
    Delete Account
  </Typography>
</Box>

      </DialogContent>

      <Dialog
  open={openConfirmDelete}
  onClose={() => setOpenConfirmDelete(false)}
>
  <DialogTitle>Confirm Account Deletion</DialogTitle>
  <DialogContent>
    <Typography>Are you sure you want to delete your account?</Typography>
  </DialogContent>
  <DialogActions>
    <Button
      onClick={() => setOpenConfirmDelete(false)}
      variant="contained"
      sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "darkred" } }}
    >
      No
    </Button>
    <Button
      onClick={deleteUserAccount}
      variant="contained"
      sx={{ backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "darkred" } }}
    >
      Yes
    </Button>
  </DialogActions>
</Dialog>


      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

EditProfileForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileForm;
