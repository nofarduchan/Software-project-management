import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

// מערך תמונות שישמשו כרקע
const images = [
  "/assets/background1.jpg",
  "/assets/background2.jpg",
  "/assets/background3.jpg"
];

const EntryPage = () => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // יצירת פונקציה לנווט בין דפים

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path); // ניווט לדף לפי הנתיב שנבחר
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        backgroundColor={`${theme.palette.background.alt}B3`}
        p="2rem"
        borderRadius="1.5rem"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <img
            src="/assets/logoTripTips.png"
            alt="TripTips Logo"
            style={{ width: "120px", height: "120px", marginRight: "1rem" }}
          />
          <Typography fontWeight="bold" fontSize="90px" color="#006B7D">
            TripTips
          </Typography>
        </Box>

        <Typography fontWeight="500" variant="h4" sx={{ mb: "1rem" }} color="#006B7D">
          {/* מקום נוסף לטקסט אם צריך */}
        </Typography>

        <Typography
          fontWeight="500"
          variant="h4"
          sx={{ mb: "1rem", color: "#004d40" }} // צבע כהה יותר
        >
          Welcome to TripTips, the Social Media for travelers!
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: "1rem", lineHeight: 1.0, color: "#004d40" }} // צבע כהה יותר
        >
          This platform is designed for travelers like you to explore and share incredible destinations.
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: "1rem", lineHeight: 1.0, color: "#004d40" }} // צבע כהה יותר
        >
          Whether you’re looking to get inspired by places others have visited, share your own travel experiences,
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: "1rem", lineHeight: 1.0, color: "#004d40" }} // צבע כהה יותר
        >
          or connect with fellow adventurers, TripTips is your go-to social network for all things travel.
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: "1rem", lineHeight: 1.0, color: "#004d40" }} // צבע כהה יותר
        >
          Discover new spots, exchange tips and stories, and make the most of your journeys with a community of passionate travelers.
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: "1rem", lineHeight: 1.0, color: "#004d40" }} // צבע כהה יותר
        >
          Let’s make every trip unforgettable together!
        </Typography>

        {/* כפתורי הניווט */}
        <Box display="flex" flexDirection="row" alignItems="center">
          <button
            style={{
              margin: "0.5rem",
              padding: "0.5rem 2rem",
              border: "none",
              borderRadius: "1rem",
              backgroundColor: "#006B7D",
              color: "white",
              cursor: "pointer",
              boxShadow: isHovered ? "0 8px 16px rgba(0, 0, 0, 0.4)" : "0 6px 12px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
              fontWeight: "bold" // שינוי המשקל של הכתב
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleNavigation("/searchGuess")}
          >
            Continue as Guest
          </button>
          <button
            style={{
              margin: "0.5rem",
              padding: "0.5rem 2rem",
              border: "none",
              borderRadius: "1rem",
              backgroundColor: "#006B7D",
              color: "white",
              cursor: "pointer",
              boxShadow: isHovered ? "0 8px 16px rgba(0, 0, 0, 0.4)" : "0 6px 12px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
              fontWeight: "bold" // שינוי המשקל של הכתב
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleNavigation("/login?type=register")}
          >
            Sign Up
          </button>
          <button
            style={{
              margin: "0.5rem",
              padding: "0.5rem 2rem",
              border: "none",
              borderRadius: "1rem",
              backgroundColor: "#006B7D",
              color: "white",
              cursor: "pointer",
              boxShadow: isHovered ? "0 8px 16px rgba(0, 0, 0, 0.4)" : "0 6px 12px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
              fontWeight: "bold" // שינוי המשקל של הכתב
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default EntryPage;