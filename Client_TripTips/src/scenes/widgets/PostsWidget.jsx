import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PropTypes from "prop-types";

const PostsWidget = ({ userId, isProfile = false, isLiked = false, isSaved = false, isShared = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);
  const token = useSelector((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (url, type) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Fetching ${type} posts...`);
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Received ${type} posts:`, data);
      dispatch(setPosts({ posts: data }));
    } catch (e) {
      console.error(`Error fetching ${type} posts:`, e);
      setError(`Failed to fetch ${type} posts`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("PostsWidget useEffect triggered");
    console.log("Current props:", { userId, isProfile, isLiked, isSaved, isShared });

    if (userId) {
      if (isProfile) {
        fetchPosts(`https://server-triptips.onrender.com/posts/${userId}/post`, "user");
      } else if (isLiked) {
        fetchPosts(`https://server-triptips.onrender.com/posts/${userId}/likes`, "liked");
      } else if (isSaved) {
        fetchPosts(`https://server-triptips.onrender.com/posts/${userId}/saves`, "saved");
      } else if (isShared) {
        fetchPosts(`https://server-triptips.onrender.com/posts/${userId}/shares`, "shared");
      } else {
        fetchPosts(`https://server-triptips.onrender.com/posts/${userId}/following`, "following");
      }
    }
  }, [userId, isProfile, isLiked, isSaved, isShared, token]);

  console.log("Current posts state:", posts);

  if (!userId) return null;
  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(posts) || posts.length === 0) return <div>No posts available</div>;

  return (
    <>
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          title={post.title}
          description={post.description}
          location={post.location}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={post.likes}
          saved={post.saved}
          shared={post.shared}
          comments={post.comments}
          stars={post.userStars}
        />
      ))}
    </>
  );
};

PostsWidget.propTypes = {
  userId: PropTypes.string.isRequired,
  isProfile: PropTypes.bool,
  isLiked: PropTypes.bool,
  isSaved: PropTypes.bool,
  isShared: PropTypes.bool,
};

export default PostsWidget;