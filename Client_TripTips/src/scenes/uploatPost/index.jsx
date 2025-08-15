import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import React from "react";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const UploadPost = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { id, picturePath } = useSelector((state) => state.user);
    console.log("id:", id);
    
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                justifyContent="center"  // ממורכז במרכז
                alignItems="center"  // ממורכז אנכית
                height="100vh"  // גובה של 100% מהמסך
            >
                <Box
                    width={isNonMobileScreens ? "50%" : "90%"}  // רוחב משתנה בהתאם למסך
                    maxWidth="600px"  // רוחב מקסימלי של התיבה
                    padding="2rem"
                    border="1px solid #ccc"
                    borderRadius="8px"
                    boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                    display="flex"
                    flexDirection="column"
                >
                    <MyPostWidget picturePath={picturePath} />
                </Box>
            </Box>
        </Box>
    );
};

export default UploadPost;