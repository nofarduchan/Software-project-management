import React, { useEffect, useCallback } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Following from "components/Following";

import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "state";
import PropTypes from "prop-types";

const FollowingListWidget = ({ userId, onFollowingChange  }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const following = useSelector((state) => state.user.following);

  const getFollowing = useCallback(async () => {
    try {
      const response = await fetch(
        `https://server-triptips.onrender.com/users/${userId}/following`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch following");
      }
      const data = await response.json();
      dispatch(setFollowing({ following: data }));
      if (onFollowingChange) {
        onFollowingChange(data.length);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  }, [userId, token, dispatch, onFollowingChange]);

  useEffect(() => {
    getFollowing();
  }, [getFollowing]);




  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Following List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {following.map((follow) => (
          <Following
            key={follow._id}
            followingId={follow._id}
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

FollowingListWidget.propTypes = {
  userId: PropTypes.string.isRequired,
  onFollowingChange: PropTypes.func,
};

export default FollowingListWidget;