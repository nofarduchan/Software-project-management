import { Box, useMediaQuery, RadioGroup, FormControlLabel, Radio, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import PostsWidgetUserSearch from "scenes/widgets/PostsWidgetUserSearch";
import NavbarSearch from "scenes/navbar_serch_user";
import UsersListWidget from "scenes/widgets/UsersListWidget";

const SearchPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const [region, setRegion] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const resetFilter = () => {
        setRegion(""); // איפוס הסינון לפי אזור
    };

    return (
        <Box>
            <NavbarSearch onSearchChange={handleSearchChange} /> 

            <Box
              sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 3,
                    px: isNonMobileScreens ? 4 : 2,
                }}
            >
                {/* חיפוש אנשים בצד שמאל */}
                <Box
                    sx={{
                        width: "27%",
                        border: "1px solid #ddd", // מסגרת דקה סביב החיפוש
                        borderRadius: "8px",
                        p: 2,
                    }}
                >
                    <UsersListWidget searchTerm={searchTerm} />
                </Box>

                {/* בחירת אזור ופוסטים בצד ימין */}
                <Box sx={{ width: "68%", ml: 2 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Select a Region:
                        </Typography>
                        <RadioGroup
                            value={region}
                            onChange={handleRegionChange}
                            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}
                        >
                            <FormControlLabel value="north" control={<Radio />} label="North" />
                            <FormControlLabel value="center" control={<Radio />} label="Center" />
                            <FormControlLabel value="south" control={<Radio />} label="South" />
                        </RadioGroup>
                        <Button
                            variant="outlined"
                            onClick={resetFilter}
                            sx={{
                                mt: 2,
                                fontSize: "0.875rem",
                                padding: "6px 12px",
                                borderColor: "#0097A7",
                                color: "#0097A7",
                                "&:hover": {
                                    backgroundColor: "#e0f7fa",
                                    borderColor: "#004e5a",
                                },
                            }}
                        >
                            Reset Filter
                        </Button>
                    </Box>

                    {/* פוסטים */}
                    <PostsWidgetUserSearch userId={_id} userPicturePath={picturePath} region={region} searchTerm={searchTerm} />
                </Box>
            </Box>
        </Box>
    );
};

export default SearchPage;