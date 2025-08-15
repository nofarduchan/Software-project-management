import React, { useEffect, useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined, Star } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFollowing } from "state";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import PropTypes from "prop-types";

const UsersListWidget = ({ searchTerm}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const following = useSelector((state) => state.user.following);
  const loggedInUserId = useSelector((state) => state.user.id);
  const [users, setUsers] = useState([]);
  

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
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

  const patchFollowing = async (followingId) => {
    const response = await fetch(
      `https://server-triptips.onrender.com/users/${id}/${followingId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFollowing({ following: data }));
    window.location.reload();
  };

  return (
    <Box>
      <Box mt="2rem">
        {users.map((user) => {
          const isFollowing = following.find((follow) => follow._id === user._id);
          const fullName = `${user.firstName} ${user.lastName}`;

          return (
            <FlexBetween key={user._id} mb="2rem">
              <FlexBetween gap="2rem">
                <UserImage image={user.picturePath} size="55px" />
                <Box
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                    navigate(0);
                  }}
                >
                  <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
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

              {user._id !== loggedInUserId && (
                <IconButton
                  onClick={() => patchFollowing(user._id)}
                  sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                  {isFollowing ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                  ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                  )}
                </IconButton>
              )}
            </FlexBetween>
          );
        })}
      </Box>
    </Box>
  );
};

UsersListWidget.propTypes = {
  searchTerm: PropTypes.string, // or PropTypes.string if it's not required
  // other props validations
};


export default UsersListWidget;