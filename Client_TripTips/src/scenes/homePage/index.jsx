import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import React from "react";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                width: "100%",
                overflowX: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    position: "fixed",
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <Navbar />
            </Box>
            <Box
                sx={{
                    mt: 8,
                    maxWidth: "700px",
                    width: "100%",
                    px: isNonMobileScreens ? 4 : 2,
                }}
            >
                <PostsWidget userId={user.id} userPicturePath={user.picturePath} />
            </Box>
        </Box>
    );
};

export default HomePage;