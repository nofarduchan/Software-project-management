import React from "react";
import PropTypes from "prop-types"; // ייבוא PropTypes
import { PersonAddOutlined, PersonRemoveOutlined, ShareOutlined, Star} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFollowers } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Follower = ({ followerId, name, subtitle, userPicturePath, stars }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const followers = useSelector((state) => state.user.followers);
  const loggedInUserId = useSelector((state) => state.user.id);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;



 const isFollower = followers.find((follower) => follower._id === followerId);
 console.log(isFollower, followerId);
 console.log("Followers array:", JSON.stringify(followers, null, 2));

 const patchFollowers = async () => {
    const response = await fetch(
      `https://server-triptips.onrender.com/users/${id}/remove-follower/${followerId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFollowers({ followers: data }));
    // window.location.reload();
  };


  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${followerId}`);
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
            {name}
            <Box display="flex" alignItems="center" ml={2}>
              <Star color="primary" />
              <Typography variant="body1" ml={1}>{stars || 0} stars</Typography>
            </Box>
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      
    {followerId !== loggedInUserId && (
      <IconButton
        onClick={() => patchFollowers()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFollower ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    )}
    </FlexBetween>
  );
};

// הגדרת PropTypes עבור רכיב Friend
Follower.propTypes = {
  followerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  userPicturePath: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
};

export default Follower;
