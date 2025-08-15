import { Box, Typography, Avatar } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import PropTypes from "prop-types";
import React from "react";
import {  useSelector } from "react-redux";
import { Star} from "@mui/icons-material";



const PostWidgetNoUser = ({ name, title, description, picturePath, likeCount, userPicturePath, location,
    stars = useSelector((state) => state.user.stars),
 }) => {
  return (
    <WidgetWrapper m="2rem 0">
      <Box display="flex" alignItems="center">
        <Avatar
          alt={name}
          src={`https://server-triptips.onrender.com/assets/${userPicturePath}`}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box>
          <Typography variant="h5" color="grey" sx={{ fontWeight: "bold" }}>
            {name}
            <Box display="flex" alignItems="center" ml={2}>
              <Star color="primary" />
              <Typography variant="body1" ml={1}>{stars || 0} stars</Typography>
            </Box>
          </Typography>
          {location && (
            <Typography variant="body2" color="textSecondary">
              {location}
            </Typography>
          )}
        </Box>
      </Box>
      <Typography variant="h6" color="textSecondary" sx={{ mt: "0.5rem" }}>
        {title}
      </Typography>
      <Typography color="textSecondary" sx={{ mt: "0.5rem", mb: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <Box position="relative">
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`https://server-triptips.onrender.com:3001/assets/${picturePath}`}
          />
        </Box>
      )}
      <Typography color="textSecondary" sx={{ mt: "0.5rem" }}>
        {likeCount} Likes
      </Typography>
    </WidgetWrapper>
  );
};

PostWidgetNoUser.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  likeCount: PropTypes.number.isRequired,
  userPicturePath: PropTypes.string.isRequired, // נתיב תמונת הפרופיל של המשתמש שהעלה את הפוסט
  location: PropTypes.string, // הוספת location כפרופ אופציונלי
  stars: PropTypes.number.isRequired,

};

export default PostWidgetNoUser;