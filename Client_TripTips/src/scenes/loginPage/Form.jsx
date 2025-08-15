import React, { useState } from "react"; // מייבא את React ואת useState מהספרייה
import PropTypes from "prop-types"; // מייבא את PropTypes לסוגים של פרופס
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material"; // מייבא קומפוננטות שונות מ-Material UI
import { Formik } from "formik"; // מייבא את Formik לניהול טפסים
import * as yup from "yup"; // מייבא את yup לאימות
import { useNavigate } from "react-router-dom"; // מייבא את useNavigate לניווט
import { useDispatch } from "react-redux"; // מייבא את useDispatch לניהול מצב Redux
import { setLogin } from "state"; // מייבא את setLogin לפעולה ב-Redux
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// סכמות אימות עבור שדות הטופס
const emailValidationSchema = yup.string()
  .email("Invalid email address") // אימות כתובת דוא"ל
  .matches(/^[^\s@]+@[^\s@]+\.(com|net|org|co\.il|ac\.il)$/, "Invalid email format. Must end with .com, .net, .org, .co.il, or .ac.il with at least two characters after the dot.") 
  // אימות פורמט כתובת דוא"ל
  .required("Required"); // שדה חובה

const passwordValidationSchema = yup.string()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 
    "Password must include at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.") // אימות סיסמה
  .required("Required"); // שדה חובה

// סכמת אימות עבור מספר טלפון
const phoneValidationSchema = yup.string()
  .matches(/^05\d{8}$/, "Phone number must be in the format 05XXXXXXXXXX with 10 numbers") // אימות פורמט מספר טלפון
  .required("Required"); // שדה חובה

// סכמות אימות עבור הטופס הרשמה
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"), // אימות שם פרטי
  lastName: yup.string().required("Required"), // אימות שם משפחה
  email: emailValidationSchema, // אימות דוא"ל
  password: passwordValidationSchema, // אימות סיסמה
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match") // אימות התאמה בין סיסמה לאימות סיסמה
    .required("Required"), // שדה חובה
  location: yup.string().required("Required"), // אימות מקום מגורים
  occupation: yup.string().required("Required"), // אימות עיסוק
  phoneNumber: phoneValidationSchema, // אימות מספר טלפון
  picture: yup.string().required("required"),
});

// סכמת אימות עבור טופס כניסה
const loginSchema = yup.object().shape({
  login: yup.string()
    .test("is-valid", "Invalid email or phone number", function(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^05\d{8}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    })
    .required("Required"), // אימות דוא"ל או מספר טלפון
  password: passwordValidationSchema, // אימות סיסמה
});

// ערכים התחלתיים עבור טופס הרשמה
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  occupation: "",
  phoneNumber: "", // הוספת מספר טלפון לערכים התחלתיים
  picture:""
};

// ערכים התחלתיים עבור טופס כניסה
const initialValuesLogin = {
  login: "",
  password: "",
};

// קומפוננטת הטופס
const Form = ({ type }) => {
  const [pageType, setPageType] = useState(type); // מצב שמחזיק את סוג הטופס (כניסה או הרשמה)
  const { palette } = useTheme(); // גישה לנושא ה-Material UI
  const dispatch = useDispatch(); // חיבור ל-Redux
  const navigate = useNavigate(); // חיבור לפונקציית הניווט
  const isNonMobile = useMediaQuery("(min-width:600px)"); // בדיקת רוחב המסך למובייל או דסקטופ
  const isLogin = pageType === "login"; // בדיקה אם מדובר בכניסה
  const isRegister = pageType === "register"; // בדיקה אם מדובר בהרשמה

  // פונקציה לטיפול בהרשמה
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    const savedUserResponse = await fetch(
      "https://server-triptips.onrender.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm();

    if (savedUser) {
      await login({ login: values.email, password: values.password }, onSubmitProps);
    }
  };

  
  // פונקציה לטיפול בכניסה
  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("https://server-triptips.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      if (!loggedInResponse.ok) {
        throw new Error(`HTTP error! Status: ${loggedInResponse.status}`);
      }
  
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
  
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
        return true; // החזרת ערך המציין הצלחה
      }
      return false; // החזרת ערך המציין כישלון
    } catch (error) {
      console.error("Error during login:", error);
      return false; // החזרת ערך המציין כישלון במקרה של שגיאה
    }
  };

  // פונקציה לטיפול שליחת הטופס
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  };

  // פונקציה לשינוי בין טפסי הרשמה לכניסה
  const handlePanelChange = (panelType) => {
    setPageType(panelType);
    navigate(`/login?type=${panelType}`); // ניווט בהתאם לסוג הטופס
  };

  return (
    <Formik
      onSubmit={handleFormSubmit} // טיפול בשליחת הטופס
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} // ערכים התחלתיים בהתאם לסוג הטופס
      validationSchema={isLogin ? loginSchema : registerSchema} // סכמת אימות בהתאם לסוג הטופס
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}> {/* טופס עם טיפול בשליחה */}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // הגדרת גריד למיקומם של השדות
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // הגדרה אם לשנות את מיקום השדות במסך קטן
            }}
          >
            {isRegister && ( // הצגת שדות הרשמה בלבד אם מדובר בהרשמה
              <>
                <TextField
                  label="First Name" // שם פרטי
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name" // שם משפחה
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location" // מקום מגורים
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation" // עיסוק
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Phone Number" // מספר טלפון
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Email" // דוא"ל
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
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
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
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
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {isLogin && (
              <TextField
                label="Email or Phone Number" // דוא"ל או מספר טלפון
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.login}
                name="login"
                error={Boolean(touched.login) && Boolean(errors.login)}
                helperText={touched.login && errors.login}
                sx={{ gridColumn: "span 4" }}
              />
            )}
            <TextField
              label="Password" // סיסמה
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {isRegister && ( // הצגת שדה אימות סיסמה רק אם מדובר בהרשמה
              <TextField
                label="Confirm Password" // אימות סיסמה
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            )}
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit" // כפתור שליחה
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#006B7D",
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"} {/* טקסט כפתור בהתאם לסוג הטופס */}
            </Button>
            <Typography
              onClick={() => handlePanelChange(isLogin ? "register" : "login")} // החלפת בין טפסים בלחיצה על הקישור
              sx={{
                textDecoration: "underline",
                color: "#006B7D",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Register here."
                : "Already have an account? Login here."} {/* טקסט קישור בהתאם לסוג הטופס */}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

// הגדרת סוגי הפרופס עבור Form
Form.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};

export default Form; // ייצוא הקומפוננטה לשימוש במקומות אחרים