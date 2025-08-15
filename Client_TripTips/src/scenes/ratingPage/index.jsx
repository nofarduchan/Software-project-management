import { Box, useMediaQuery, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import React, { useState, useCallback } from "react";
import UsersListWidget from "scenes/widgets/UsersListWidget";
import { debounce } from "lodash";

const RatingPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = useCallback(
        debounce((term) => {
            setSearchTerm(term);
        }, 300),
        []
    );

    const handleSearchChange = (event) => {
        debouncedSearch(event.target.value);
    };

    return (
        <>
            <Navbar 
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1100
                }}
            />
            
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    mt: "64px",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "700px",
                        width: "100%",
                        px: isNonMobileScreens ? 4 : 2,
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search users..."
                        onChange={handleSearchChange}
                        sx={{ mb: 2 }}
                    />
                    <UsersListWidget searchTerm={searchTerm} />
                </Box>
            </Box>
        </>
    );
};

export default RatingPage;