import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container, Divider, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteServiceDialog from "./DeleteServiceDialog";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";

export default function RequestedService(props) {
    const requestedService = props.requestedService;
    const [user, setUser] = useState(null);
    let bp = require("./Path.js");

    useEffect(() => {
        axios
            .post(bp.buildPath("api/get-user"), {
                userId: requestedService.RequesterId,
            })
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [requestedService]);

    const Img = styled("img")({
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    });

    console.log(user);

    return (
        <Container>
            {user !== null && (
                <Paper
                    sx={{
                        margin: "auto",
                        maxWidth: 800,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#1A2027" : "white",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item sx={{ p: 2, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#2074d4' }}>
                            <Img sx={{ width: 256, height: 256 }} alt="complex" src={user.ProfilePicture === null ? '' : user.ProfilePicture} />
                        </Grid>
                        <Grid item xs={12} md container >

                            <Grid item xs container direction="column" sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }} spacing={1} >
                                <Stack direction="column" spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
                                    <Grid item xs sx={{ display: 'flex', justifyContent: "center", alignItems: "center"  }}>
                                        <Typography
                                            variant="h4"
                                            sx={{ fontWeight: "bold" }}
                                            component="div"
                                        >
                                            {user.FirstName} {user.LastName}
                                        </Typography>
                                    </Grid>
                                        
                                    <Grid item xs sx={{ display: 'flex', justifyContent: "center", alignItems: "center"  }}>
                                        <Typography variant="body1">
                                            Their Request: {requestedService.DescriptionFromRequester}
                                        </Typography>
                                    </Grid>
                                    <Grid item container direction="row" xs>
                                        <Grid item xs="6" sx={{ borderRight: "1px solid #e0e0e0", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                            <Typography
                                                variant="h5"
                                            >
                                                {new Date(requestedService.Dates).toLocaleDateString("en-US")}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs="6" sx={{ display: 'flex', justifyContent: "center" , alignItems: "center" }}>
                                            <Typography variant="h5">
                                                ${requestedService.Price}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Grid>

                        </Grid>
                    </Grid>


                </Paper>
            )
            }
        </Container >
    );
}
