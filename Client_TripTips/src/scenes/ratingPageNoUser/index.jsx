import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar_rating_no_user";
import React, { useState } from "react";
import UsersListWidgetGuest from "scenes/widgets/UsersListWidgetGuest";

const RatingPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    return (
        <>
            {/* Navbar עם רוחב מלא */}
            <Navbar 
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1100 // ניתן לערוך בהתאם לצורך
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // מרכז את התוכן
                    p: 2, // הוסף ריפוד פנימי
                    mt: "64px", // הוסף מרווח עליון כדי להימנע מהסתרת התוכן על ידי ה-navbar
                }}
            >
                <Box
                    sx={{
                        maxWidth: "700px", // מגביל את רוחב התוכן למקסימום של 700 פיקסלים
                        width: "100%", // גורם לתוכן לתפוס את רוחב הקונטיינר ההורה
                        px: isNonMobileScreens ? 4 : 2, // הוסף ריפוד צדדי בהתאמה למסך קטן וגדול
                    }}
                >
                    <UsersListWidgetGuest searchTerm={searchTerm} />
                </Box>
            </Box>
        </>
    );
};

export default RatingPage;