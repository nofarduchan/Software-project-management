import React, { useEffect, useState } from "react";
import { Star, PersonAddOutlined } from "@mui/icons-material";
import { Box, Typography, TextField, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import PropTypes from "prop-types";

const UsersListWidgetGuest = ({ searchTerm }) => {
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const getUsers = async () => {
      let url = "https://server-triptips.onrender.com/users";
      if (searchTerm) {
        url += `/search?searchTerm=${searchTerm}`;
      } else {
        url += "/sortedByStars";
      }
      
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    };

    getUsers();
  }, [searchTerm, token]);
  const handleFollowClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      {/* <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      /> */}
      <Box mt="2rem">
        {users.map((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;

          return (
            <FlexBetween key={user._id} mb="2rem">
              <FlexBetween gap="2rem">
                <UserImage image={user.picturePath} size="55px" />
                <Box>
                  <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "default",
                      },
                    }}
                  >
                    {fullName}
                    <Box display="flex" alignItems="center" ml={2}>
                      <Star color="primary" />
                      <Typography variant="body1" ml={1}>{user.stars || 0} stars</Typography>
                    </Box>
                  </Typography>
                  <Typography color={medium} fontSize="0.75rem">
                    {user.occupation}
                  </Typography>
                </Box>
              </FlexBetween>
              <IconButton
                sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
                onClick={handleFollowClick}
              >
                <PersonAddOutlined sx={{ color: palette.primary.dark }} />
              </IconButton>
            </FlexBetween>
          );
        })}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Registration Required</DialogTitle>
        <DialogContent>
          <Typography>
            To follow users, you need to be registered. Please sign up or log in.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

UsersListWidgetGuest.propTypes = {
  searchTerm: PropTypes.string, // or PropTypes.string if it's not required
  // other props validations
};

export default UsersListWidgetGuest;
