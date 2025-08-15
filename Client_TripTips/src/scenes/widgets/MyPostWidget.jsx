import React, { useState } from "react";
// import PropTypes from "prop-types";
import {
    EditOutlined,
    DeleteOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useNavigate } from "react-router-dom";


const MyPostWidget = () => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [post, setPost] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [region, setRegion] = useState(""); // מצב מקומי לשמירת האזור הנבחר
    const { palette } = useTheme();
    const user = useSelector((state) => state.user);
    const { id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const navigate = useNavigate();


    const handlePost = async () => {
        console.log("Region selected:", region);
        const formData = new FormData();
        formData.append("userId", id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        if (video) {
            formData.append("video", video);
            formData.append("videoPath", video.name);
        }
        formData.append("title", title);
        formData.append("location", location);
        formData.append("region", region); // הוספת האזור לנתונים הנשלחים

        const response = await fetch("https://server-triptips.onrender.com/posts", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setVideo(null);
        setPost("");
        setTitle("");
        setLocation("");
        setRegion(""); // איפוס הבחירה לאחר שליחת הפוסט
        navigate("/home");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <InputBase
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
                <InputBase
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            <FlexBetween gap="1.5rem" mt="1rem">
                <InputBase
                    placeholder="Tell me about your trip..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            <RadioGroup
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                row
                sx={{ marginTop: "1rem" }}
            >
                <FormControlLabel value="north" control={<Radio />} label="North" />
                <FormControlLabel value="center" control={<Radio />} label="Center" />
                <FormControlLabel value="south" control={<Radio />} label="South" />
            </RadioGroup>

            {(isImage || isVideo) && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles={isImage ? ".jpg,.jpeg,.png" : ".mp4"}
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            if (isImage) {
                                setImage(acceptedFiles[0]);
                            } else if (isVideo) {
                                setVideo(acceptedFiles[0]);
                            }
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image && !video ? (
                                        <p>{isImage ? "Add Image Here" : "Add Video Here"}</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{(image || video).name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {(image || video) && (
                                    <IconButton
                                        onClick={() => {
                                            if (image) setImage(null);
                                            if (video) setVideo(null);
                                        }}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => {
                    setIsImage(true);
                    setIsVideo(false);
                }}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem" onClick={() => {
                    setIsVideo(true);
                    setIsImage(false);
                }}>
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Video
                    </Typography>
                </FlexBetween>

                <Button
                    disabled={!(image || video) || !title || !location || !region}
                    onClick={handlePost}
                    sx={{
                        color: "#fff",
                        backgroundColor: "#1976d2",
                        borderRadius: "3rem",
                    }}
                >
                    POST

                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;