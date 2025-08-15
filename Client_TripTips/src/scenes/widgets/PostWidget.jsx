import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  StarOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Modal, TextField, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
import Following from "components/Following";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import PropTypes from "prop-types";
import React from "react";

const PostWidget = ({
  postId,
  postUserId,
  name,
  title,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  saved,
  shared,
  comments,
  stars = useSelector((state) => state.user.stars),
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.id);
  const [isFollowing, setIsFollowing] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    if (likes && likes[loggedInUserId] !== undefined) {
      return Boolean(likes[loggedInUserId]);
    }
    return false;
  });
  const likeCount = Object.keys(likes).length;
  
  const [isSaved, setIsSaved] = useState(Boolean(saved?.[loggedInUserId]));
  const savedCount = saved ? Object.keys(saved).length : 0;
  
  const [isShared, setIsShared] = useState(Boolean(shared?.[loggedInUserId]));
  const sharedCount = shared ? Object.keys(shared).length : 0;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedLocation, setUpdatedLocation] = useState(location);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const patchSave = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/save`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const patchShare = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/share`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsShared(!isShared);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updatePost = async () => {
    try {
      const response = await fetch(`https://server-triptips.onrender.com/posts/${postId}/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          location: updatedLocation,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  

  return (
    <WidgetWrapper
      m="2rem 0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        stars = {stars}
      /> */}
      <Following
        followingId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        stars={stars}
      />
      <Typography color={main} sx={{ mt: "1rem", fontWeight: "bold" }}>
        {title} 
      </Typography>
      <Typography color={main} sx={{ mt: "0.5rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <Box position="relative">
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`https://server-triptips.onrender.com/assets/${picturePath}`}
          />
          {loggedInUserId === postUserId && isHovered && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bgcolor="rgba(255, 255, 255, 0.7)"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box display="flex" gap="1rem">
                <IconButton
                  onClick={() => setIsEditing(true)}
                  sx={{ color: main, fontSize: "2rem" }}
                >
                  <EditOutlined fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={deletePost}
                  sx={{ color: main, fontSize: "2rem" }}
                >
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>

            <IconButton onClick={patchSave}>
              {isSaved ? (
                <BookmarkOutlined sx={{ color: primary }} />
              ) : (
                <BookmarkBorderOutlined />
              )}
            </IconButton>
            <Typography>{savedCount}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
        <IconButton onClick={patchShare}>
            <ShareOutlined />
          </IconButton>
          <Typography>{sharedCount}</Typography>
        </FlexBetween>
      </FlexBetween>

      <Modal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          p={4}
          bgcolor="background.paper"
          borderRadius="8px"
          width="80%"
          maxWidth="600px"
        >
          <Typography variant="h6" mb={2}>Edit Post</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Location"
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={updatePost}
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
            >
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </WidgetWrapper>
  );
};

PostWidget.propTypes = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  userPicturePath: PropTypes.string.isRequired,
  likes: PropTypes.object.isRequired,
  saved: PropTypes.object,
  shared: PropTypes.object,
  comments: PropTypes.array.isRequired,
  stars: PropTypes.number.isRequired,
};

export default PostWidget;