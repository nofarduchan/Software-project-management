import React, { useState, useEffect } from "react"; // ייבוא React ו-hooks מהספרייה
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"; // ייבוא רכיבי MUI
import Form from "./Form"; // ייבוא רכיב טופס מהקובץ Form
import { useLocation } from "react-router-dom"; // ייבוא ה-hook useLocation מ-react-router-dom

// מערך תמונות שישמשו כרקע
const images = [
  "/assets/background1.jpg", // נתיב לתמונה 1
  "/assets/background2.jpg", // נתיב לתמונה 2
  "/assets/background3.jpg"  // נתיב לתמונה 3
];

const LoginPage = () => {
  // קבלת התמה הנוכחית מ-MUI
  const theme = useTheme();
  // בדיקה אם המסך הוא רחב (ללא גרסת המובייל)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // יצירת מצב לשמירה על התמונה הנוכחית שמוצגת כרקע
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation(); // קבלת האובייקט location לניתוח הפרמטרים ב-URL

  // שימוש ב-useEffect כדי להחליף תמונות כל 5 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      // עדכון אינדקס התמונה הנוכחית
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // החלפת תמונה כל 5 שניות

    return () => clearInterval(interval); // ניקוי ה-interval בעת השמדת הקומפוננטה
  }, []);

  const searchParams = new URLSearchParams(location.search); // ניתוח הפרמטרים ב-URL
  const type = searchParams.get("type") || "login"; // קבלת סוג הפאנל (הרשמה או כניסה)

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${images[currentImageIndex]})`, // מתקן את השגיאה כאן
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="bold"
          variant="h3"
          color="primary"
          sx={{ mb: "1.5rem" }}
        >
          TripTips
        </Typography>
        <Form type={type} /> {/* העברת סוג הפאנל לטופס */}
      </Box>
    </Box>
  );
};

export default LoginPage;

