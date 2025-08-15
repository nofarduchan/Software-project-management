// ייבוא useState מהספרייה של React לניהול מצב הקומפוננטה
import { useState } from "react";
import React from "react";

// ייבוא רכיבים ו-Icons מספריית MUI
import {
  Box, // רכיב קונטיינר עם תמיכה ב-flexbox
  IconButton, // כפתור עם אייקון בלבד
  InputBase, // רכיב קלט טקסט
  Typography, // רכיב להוספת טקסט
  Select, // רכיב לבחירת אפשרות מתוך רשימה
  MenuItem, // פריט בתפריט נפתח
  FormControl, // רכיב עוטף עבור אלמנטים של טופס
  useTheme, // הפונקציה לקבלת נושא התמה הנוכחי
  useMediaQuery, // הפונקציה לבדוק אם מסך עומד בדרישות מסוימות
} from "@mui/material";
import {
  Search, // אייקון חיפוש
  //Message, // אייקון הודעה
  DarkMode, // אייקון מצב כהה
  LightMode, // אייקון מצב בהיר
  //Notifications, // אייקון התראות
  Help, // אייקון עזרה
  Menu, // אייקון תפריט
  Close, // אייקון סגירה
  Add, // אייקון פלוס
  Star, // אייקון כוכב
} from "@mui/icons-material";

// ייבוא useDispatch ו-useSelector מספריית React Redux לניהול מצב גלובלי
import { useDispatch, useSelector } from "react-redux";

// ייבוא פעולות סטור מ-state
import { setMode, setLogout } from "state";

// ייבוא useNavigate מספריית React Router לשימוש בניווט
import { useNavigate } from "react-router-dom";

// ייבוא רכיב מותאם אישית בשם FlexBetween
import FlexBetween from "components/FlexBetween";

// קומפוננטת ה-Navbar
const Navbar = () => {
  // הגדרת מצב לניהול תצוגת התפריט הנייד
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  
  // הגדרת מצב לניהול תצוגת אייקון ה-Help
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  
  // הגדרת מצב לניהול תצוגת אייקון ה-Add
  const [isAddHovered, setIsAddHovered] = useState(false);
  
  // הגדרת מצב לניהול תצוגת אייקון ה-Star
  const [isStarHovered, setIsStarHovered] = useState(false);
  
  // חיבור לפעולות Redux (לדוג' לשנות את מצב ה-theme ולבצע התנתקות)
  const dispatch = useDispatch();
  
  // חיבור לפונקציית ניווט (לעבור בין עמודים)
  const navigate = useNavigate();
  
  // קבלת פרטי המשתמש מהסטור
  const user = useSelector((state) => state.user);
  
  // בדיקה אם המסך הוא רחב (ללא גרסת המובייל)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // קבלת נושא התאמה אישית מהתמה (צבעים וסטיילים)
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light; // צבע לבן בהיר
  const dark = theme.palette.neutral.dark; // צבע כהה
  const background = theme.palette.background.default; // צבע רקע ברירת מחדל
  const primaryLight = theme.palette.primary.light; // צבע ראשי בהיר
  const alt = theme.palette.background.alt; // צבע רקע חלופי

  // יצירת שם מלא של המשתמש
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    // מיכל עליון של ה-Navbar
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      {/* תצוגת כותרת עם חיפוש */}
      <FlexBetween gap="1.75rem">
        {/* כותרת האתר */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)" // גודל גמיש של פונטים
          color="#006B7D" // צבע ראשי
          onClick={() => navigate("/home")} // ניווט לעמוד הבית כאשר לוחצים על הכותרת
          sx={{
            // שינוי צבע ואזור הקלקה כאשר המשתמש עובר עם העכבר על הכותרת
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          TripTips
        </Typography>
        {/* שדה חיפוש במסכים רחבים בלבד */}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." /> {/* שדה חיפוש */}
            <IconButton>
              <Search /> {/* אייקון חיפוש */}
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* ניווט בשולחן עבודה */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* כפתור מצב תמה */}
          <IconButton onClick={() => dispatch(setMode())}> 
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} /> // אייקון מצב כהה
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} /> // אייקון מצב בהיר
            )}
          </IconButton>
          {/*<Message sx={{ fontSize: "25px" }} /> {/* אייקון הודעה */}
          {/*<Notifications sx={{ fontSize: "25px" }} /> {/* אייקון התראות */}
          <IconButton
            onMouseEnter={() => setIsAddHovered(true)}
            onMouseLeave={() => setIsAddHovered(false)}
            sx={{
              boxShadow: isAddHovered ? `0px 4px 8px ${primaryLight}` : "none",
              "&:hover": {
                boxShadow: `0px 4px 8px ${primaryLight}`,
              },
              "&:active": {
                boxShadow: `0px 4px 8px ${primaryLight}`,
              },
              transition: "box-shadow 0.3s",
            }}
          >
            <Add sx={{ fontSize: "25px" }} /> {/*אייקון הוספה */}
          </IconButton>
          <IconButton
            onMouseEnter={() => setIsStarHovered(true)}
            onMouseLeave={() => setIsStarHovered(false)}
            sx={{
              boxShadow: isStarHovered ? `0px 4px 8px ${primaryLight}` : "none",
              "&:hover": {
                boxShadow: `0px 4px 8px ${primaryLight}`,
              },
              "&:active": {
                boxShadow: `0px 4px 8px ${primaryLight}`,
              },
              transition: "box-shadow 0.3s",
            }}
          >
            <Star sx={{ fontSize: "25px" }} /> {/*אייקון כוכב */}
          </IconButton>
          <IconButton
            onClick={() => navigate("/about")}
            onMouseEnter={() => setIsHelpHovered(true)}
            onMouseLeave={() => setIsHelpHovered(false)}
            sx={{
              color: dark,
              boxShadow: isHelpHovered ? `0px 4px 8px ${primaryLight}` : "none",
              "&:hover": {
                boxShadow: `0px 4px 8px ${primaryLight}`,
              },
              "&:active": {
                boxShadow: `0px 4px 8px ${primaryLight}`,
              },
              transition: "box-shadow 0.3s",
            }}
          >
            <Help sx={{ fontSize: "25px" }} /> {/* אייקון עזרה */}
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography> {/* שם המשתמש */}
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem> {/* התנתקות */}
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        // כפתור לתפריט נייד
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu /> {/* אייקון תפריט */}
        </IconButton>
      )}

      {/* תפריט נייד */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* סגירת תפריט נייד */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close /> {/* אייקון סגירה */}
            </IconButton>
          </Box>

          {/* תפריט נייד */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* כפתור מצב תמה */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} /> // אייקון מצב כהה
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} /> // אייקון מצב בהיר
              )}
            </IconButton>
            {/*<Message sx={{ fontSize: "25px" }} /> {/* אייקון הודעה */}
            {/*<Notifications sx={{ fontSize: "25px" }} /> {/* אייקון התראות */}
            <IconButton
              onMouseEnter={() => setIsAddHovered(true)}
              onMouseLeave={() => setIsAddHovered(false)}
              sx={{
                boxShadow: isAddHovered ? `0px 4px 8px ${primaryLight}` : "none",
                "&:hover": {
                  boxShadow: `0px 4px 8px ${primaryLight}`,
                },
                "&:active": {
                  boxShadow: `0px 4px 8px ${primaryLight}`,
                },
                transition: "box-shadow 0.3s",
              }}
            >
              <Add sx={{ fontSize: "25px" }} /> {/* אייקון הוספה */}
            </IconButton>
            <IconButton
              onMouseEnter={() => setIsStarHovered(true)}
              onMouseLeave={() => setIsStarHovered(false)}
              sx={{
                boxShadow: isStarHovered ? `0px 4px 8px ${primaryLight}` : "none",
                "&:hover": {
                  boxShadow: `0px 4px 8px ${primaryLight}`,
                },
                "&:active": {
                  boxShadow: `0px 4px 8px ${primaryLight}`,
                },
                transition: "box-shadow 0.3s",
              }}
            >
              <Star sx={{ fontSize: "25px" }} /> {/*אייקון כוכב */}
            </IconButton>
            <IconButton
              onClick={() => navigate("/about")}
              onMouseEnter={() => setIsHelpHovered(true)}
              onMouseLeave={() => setIsHelpHovered(false)}
              sx={{
                color: dark,
                boxShadow: isHelpHovered ? `0px 4px 8px ${primaryLight}` : "none",
                "&:hover": {
                  boxShadow: `0px 4px 8px ${primaryLight}`,
                },
                "&:active": {
                  boxShadow: `0px 4px 8px ${primaryLight}`,
                },
                transition: "box-shadow 0.3s",
              }}
            >
              <Help sx={{ fontSize: "25px" }} /> {/* אייקון עזרה */}
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography> {/* שם המשתמש */}
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem> {/* התנתקות */}
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
