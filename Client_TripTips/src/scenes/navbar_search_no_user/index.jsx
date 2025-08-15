import { useState } from "react";
import React from "react";
import PropTypes from "prop-types"; // ייבוא PropTypes
import {
  Box,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import { Search, DarkMode, LightMode, Menu, Close, Star } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavbarSearchNoUser = ({ onSearchChange }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // state למונח החיפוש
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // עדכון ה-state המקומי
    if (onSearchChange) {
      onSearchChange(value); // קריאה לפונקציה המועברת מ-SearchPage לעדכון מונח החיפוש
    }
  };

  const handleSearchClick = () => {
    if (onSearchChange) {
      onSearchChange(searchTerm); // קריאה לפונקציה המועברת כשמשתמש לוחץ על החיפוש
    }
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#006B7D"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: "#0094A0",
              cursor: "pointer",
            },
          }}
        >
          TripTips
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase
              placeholder="Search..."
              value={searchTerm}  // קישור הערך לשדה החיפוש
              onChange={handleSearchChange} // הוספת אירוע שינוי לשדה החיפוש
            />
            <IconButton onClick={handleSearchClick}> {/* חיבור הכפתור לפונקציית החיפוש */}
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton onClick={() => navigate("/ratingGuess")}>
            <Star sx={{ fontSize: "25px", color: dark }} />
          </IconButton>

          <Button variant="contained" color="primary" onClick={() => navigate("/login?type=register")}>
            Sign Up
          </Button>

          <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

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
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <IconButton onClick={() => navigate("/ratingGuess")} sx={{ fontSize: "25px" }}>
              <Star sx={{ fontSize: "25px", color: dark }} />
            </IconButton>

            <Button variant="contained" color="primary" onClick={() => navigate("/login?type=register")}>
              Sign Up
            </Button>

            <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

NavbarSearchNoUser.propTypes = {
  onSearchChange: PropTypes.func, // הוספת בדיקת PropTypes ל-onSearchChange
};

export default NavbarSearchNoUser;