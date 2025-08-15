import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidgetNoUser from "./PostWidgetNoUser";
import PropTypes from "prop-types";

const PostsWidgetNoUserSearch = ({ region, searchTerm }) => { 
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);

  const getAllPosts = async () => {
    const response = await fetch(`https://server-triptips.onrender.com/posts/guest?searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getPostsByRegion = async () => {
    const response = await fetch(`https://server-triptips.onrender.com/posts/region/guest?region=${encodeURIComponent(region)}&searchTerm=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    console.log("Search term being used:", searchTerm);
    if (region) {
      getPostsByRegion(); 
    } else {
      getAllPosts(); 
    }
  }, [region, searchTerm]);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>oopsi not found :)</div>; 
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          firstName,
          lastName,
          title,
          description,
          picturePath,
          userPicturePath,
          likes,
          location, // הוספת location לפוסט
          userStars
        }) => (
          <PostWidgetNoUser
            key={_id} 
            name={`${firstName} ${lastName}`} 
            title={title} 
            description={description} 
            picturePath={picturePath} 
            userPicturePath={userPicturePath}
            likeCount={Object.keys(likes).length} 
            location={location} // העברת location ל-PostWidgetNoUser
            stars={userStars}
          />
        )
      )}
    </>
  );
};

PostsWidgetNoUserSearch.propTypes = {
  region: PropTypes.string,
  searchTerm: PropTypes.string,
};

export default PostsWidgetNoUserSearch;