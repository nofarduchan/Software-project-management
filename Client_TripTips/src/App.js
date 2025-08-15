import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import AboutPage from "scenes/aboutPage";
import SearchPage from "scenes/searchPage";
import RatingPage from "scenes/ratingPage";
import EntryPage from "scenes/entryPage";
import UploadPost from "scenes/uploatPost";
import SearchPageNoUser from "scenes/searchPageNoUser";
import RatingPageNoUser from "scenes/ratingPageNoUser";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import React from "react";




function App() {
  // השגת מצב הנושא (מצב כהה או בהיר) מהחנות של Redux
  const mode = useSelector((state) => state.mode);
  
  // יצירת נושא חדש עם ההגדרות המתאימות למצב הנוכחי
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // בדיקה אם המשתמש מחובר באמצעות קיום של טוקן
  const isAuth = Boolean(useSelector((state) => state.token));




  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/*  עבור דף כניסה>*/}
            <Route path="/" element={<EntryPage />} />

            {/* Route עבור דף ההתחברות */}
            <Route path="/login" element={<LoginPage />} />

            {/* Route עבור דף הבית, אם המשתמש מחובר */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            {/*<Route path="/home" element={<HomePage />} />  */}

            {/*דף חיפוש למשתמשים */}
            <Route path="/search" element={<SearchPage />} />

            {/*דף חיפוש לאורחים */}
            <Route path="/searchGuess" element={<SearchPageNoUser />} />

            {/*דף דירוג לאורחים */}
            <Route path="/ratingGuess" element={<RatingPageNoUser />} />

             {/*  עבור דף דירוג>*/}
             <Route path="/rating" element={<RatingPage />} />

             {/*  עבור דף אודות>*/}
            <Route path="/about" element={<AboutPage />} />

             {/* העלאת תמונה */}
            <Route path="/upload" element={<UploadPost />} />

            {/* Route עבור דף פרופיל המשתמש, אם המשתמש מחובר */}
            {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;