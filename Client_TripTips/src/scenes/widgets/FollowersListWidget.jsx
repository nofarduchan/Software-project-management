import React, { useEffect, useCallback } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Followers from "components/Followers";

import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFollowers } from "state";
import PropTypes from "prop-types";

const FollowersListWidget = ({ userId, onFollowersChange  }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const followers = useSelector((state) => state.user.followers);

  const getFollowers = useCallback(async () => {
    try {
      const response = await fetch(
        `https://server-triptips.onrender.com/users/${userId}/followers`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch followers");
      }
      const data = await response.json();
      dispatch(setFollowers({ followers: data }));
      if (onFollowersChange) {
        onFollowersChange(data.length);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  }, [userId, token, dispatch, onFollowersChange]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);




  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Followers List 
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {followers.map((follow) => (
          <Followers
            key={follow._id}
            followerId={follow._id}
            name={`${follow.firstName} ${follow.lastName}`}
            subtitle={follow.occupation}
            userPicturePath={follow.picturePath}
            starts = {follow.starts}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

FollowersListWidget.propTypes = {
  userId: PropTypes.string.isRequired,
  onFollowersChange: PropTypes.func,
};

export default FollowersListWidget;