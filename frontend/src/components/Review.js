import React, { useState, useEffect } from "react";
import { Divider, Avatar, Grid, Paper } from "@mui/material";
import axios from "axios";

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
                <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt={user.Username} src={user.ProfilePicture} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{user.FirstName} {user.LastName}</h4>
                            <h5 style={{ margin: 0, textAlign: "left" }}>{review.Rating}/5</h5>
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