import React, { useState, useEffect } from "react";
import { Divider, Avatar, Grid, Paper, Box } from "@mui/material";
import axios from "axios";
import Ratings from 'react-ratings-declarative';

export default function Review(props) {
    const [user, setUser] = useState(null);
    const review = props.review
    let bp = require("./Path.js");

    useEffect(() => {
        console.log("IN REVIEW USE EFFECT")
        let mounted = true;
        axios
            .post(bp.buildPath("api/get-user"), {
                userId: review.UserId
            })
            .then((response) => {
                if (mounted) {
                    setUser(response.data.user);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return () => mounted = false;
    }, []);


    return (
        <div>
            {user !== null && (
                <Paper elevation={3} 
                        sx={{ p: "40px 20px", 
                        mt: 2, 
                        backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1A2027" : "rgba(0, 60, 128, 0.01)", }}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt={user.Username} src={user.ProfilePicture} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{user.FirstName} {user.LastName}</h4>
                                <Box sx={{ml: 2}}></Box>
                                <Ratings
                                    rating={review.Rating}
                                    widgetDimensions="25px"
                                    widgetSpacings="5px"
                                    widgetRatedColors="#003c80"
                                >
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                </Ratings>
                            </Box>
                            
                            <p style={{ textAlign: "left" }}>
                                {review.ReviewText}{" "}
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </div>


    )
}