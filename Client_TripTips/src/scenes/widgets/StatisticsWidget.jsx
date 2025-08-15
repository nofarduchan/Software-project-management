import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const StatItem = ({ value, label }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Blue gradient
      width: "200px", // Set width for alignment
      margin: "10px", // Add margin for spacing
    }}
  >
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          component="div"
          sx={{ fontWeight: "bold", color: "#1e88e5" }} // Blue color
        >
          {value}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#1e88e5", marginTop: "8px", textTransform: "uppercase" }}
        >
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

StatItem.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const StatisticsWidget = ({ userId }) => {
  const [totalLikes, setTotalLikes] = useState(null);
  const [totalSaves, setTotalSaves] = useState(null);
  const [totalShares, setTotalShares] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://server-triptips.onrender.com/posts/${userId}/post`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        calculateTotalLikes(data);
        calculateTotalSaves(data);
        calculateTotalShares(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setTotalLikes(0); // Set to 0 if there's an error fetching the posts
        setTotalSaves(0);  // Set to 0 if there's an error fetching the posts
        setTotalShares(0); // Set to 0 if there's an error fetching the posts
      }
    };

    const calculateTotalLikes = (posts) => {
      let total = 0;
      posts.forEach((post) => {
        total += Object.keys(post.likes || {}).length;
      });
      setTotalLikes(total);
    };

    const calculateTotalSaves = (posts) => {
      let total = 0;
      posts.forEach((post) => {
        total += Object.keys(post.saved || {}).length;
      });
      setTotalSaves(total);
    };

    const calculateTotalShares = (posts) => {
      let total = 0;
      posts.forEach((post) => {
        total += Object.keys(post.shared || {}).length;
      });
      setTotalShares(total);
    };

    fetchPosts();
  }, [userId, token]);

  if (totalLikes === null || totalSaves === null || totalShares === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      mt={2} 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      sx={{ 
        flexDirection: { xs: "column", sm: "row" }, // Adjust layout for different screen sizes
        padding: "16px", 
      }}
    >
      <StatItem value={totalLikes} label="Likes" />
      <StatItem value={totalSaves} label="Saves" />
      <StatItem value={totalShares} label="Shares" />
    </Box>
  );
};

StatisticsWidget.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default StatisticsWidget;
