import { useState } from "react";
import React from "react";
import PropTypes from "prop-types"; // ייבוא PropTypes

import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  Add,
  Star,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Avatar } from "@mui/material";

const NavbarSearch = ({ onSearchChange }) => { // קבלת onSearchChange כ-`prop`
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isAddHovered, setIsAddHovered] = useState(false);
  const [isStarHovered, setIsStarHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // state למונח החיפוש

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userPicturePath = user.picturePath;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

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
          onClick={() => navigate("/home")}
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

          <IconButton
            onClick={() => navigate("/upload")}
            onMouseEnter={() => setIsAddHovered(true)}
            onMouseLeave={() => setIsAddHovered(false)}
            sx={{
              color: dark,
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
            <Add sx={{ fontSize: "25px" }} />
          </IconButton>

          <IconButton
            onMouseEnter={() => setIsStarHovered(true)}
            onMouseLeave={() => setIsStarHovered(false)}
            onClick={() => navigate("/rating")}
            sx={{
              color: dark,
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
            <Star sx={{ fontSize: "25px" }} />
          </IconButton>

            {/* הוספת אייקון פרופיל ושם המשתמש */}
            <Box
            onClick={() => navigate(`/profile/${user.id}`)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Avatar
              // alt={fullName}
              src={`https://server-triptips.onrender.com/assets/${userPicturePath}`}
              sx={{ width: 32, height: 32 }}
            />
            {/* <Typography>{fullName}</Typography> */}
          </Box>

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
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
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
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
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
            <IconButton
              onClick={() => navigate("/upload")}
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
              <Add sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton
              onMouseEnter={() => setIsStarHovered(true)}
              onMouseLeave={() => setIsStarHovered(false)}
              onClick={() => navigate("/rating")}
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
              <Star sx={{ fontSize: "25px" }} />
            </IconButton>
            <Box
              onClick={() => navigate(`/profile/${user.id}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <Avatar
                // alt={fullName}
                src={`https://server-triptips.onrender.com/assets/${userPicturePath}`}
                sx={{ width: 32, height: 32 }}
              />
              {/* <Typography>{fullName}</Typography> */}
            </Box>
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
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

NavbarSearch.propTypes = {
  onSearchChange: PropTypes.func, // הוספת הבדיקה ל-prop-types, מוגדר כאופציונלי
};

export default NavbarSearch;