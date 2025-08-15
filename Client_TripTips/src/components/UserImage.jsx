import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";


const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://server-triptips.onrender.com/assets/${image}`}
      />
    </Box>
  );
};

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default UserImage;
