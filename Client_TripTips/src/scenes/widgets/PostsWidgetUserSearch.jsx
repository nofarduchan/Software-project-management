import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";

const PostsWidget = ({ userId, region, searchTerm , isProfile = false, isLiked = false, isSaved = false, isShared = false }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const posts = useSelector((state) => state.posts || []);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);

  const getAllPosts = async () => {
    const response = await fetch(`https://server-triptips.onrender.com/posts?searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getPostsByRegion = async () => {
    const response = await fetch(`https://server-triptips.onrender.com/posts/region?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://server-triptips.onrender.com/posts/${userId}/posts?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data.user && data.posts) {
      setUser(data.user);
      dispatch(setPosts({ posts: data.posts }));
    } else {
      dispatch(setPosts({ posts: data }));
    }
  };

  const getLikedPosts = async () => {
    const response = await fetch(
      `https://server-triptips.onrender.com/${userId}/likes?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getSavedPosts = async () => {
    const response = await fetch(
      `https://server-triptips.onrender.com/posts/${userId}/saves?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getSharedPosts = async () => {
    const response = await fetch(
      `https://server-triptips.onrender.com/posts/${userId}/shares?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else if (isLiked) {
      getLikedPosts();
    } else if (isSaved) {
      getSavedPosts();
    } else if (isShared) {
      getSharedPosts();
    } else if (region) {
      getPostsByRegion();
    } else {
      getAllPosts();
    }
  }, [searchTerm, region, isProfile, isLiked, isSaved, isShared]);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>oopsi not found :)</div>;
  }

  return (
    <>
      {/* {user && (
        <WidgetWrapper>
          <FlexBetween gap="0.5rem" pb="1.1rem">
            <FlexBetween gap="1rem">
              <UserImage image={user.picturePath} size="55px" />
              <Box>
                <Typography
                  variant="h4"
                  color={palette.neutral.dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography color={palette.neutral.medium}>{user.occupation}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          <Typography color={palette.neutral.medium}>Stars: {user.stars || 0}</Typography>
        </WidgetWrapper>
      )} */}
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          title,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          saved, 
          shared,
          comments,
          userStars,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            title={title}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            saved={saved}
            shared={shared}
            comments={comments}
            stars={userStars}
          />
        )
      )}
    </>
  );
};

PostsWidget.propTypes = {
  userId: PropTypes.string.isRequired,
  region: PropTypes.string,
  searchTerm: PropTypes.string,
  isProfile: PropTypes.bool,
  isLiked: PropTypes.bool,
  isSaved: PropTypes.bool,
  isShared: PropTypes.bool,
};

export default PostsWidget;