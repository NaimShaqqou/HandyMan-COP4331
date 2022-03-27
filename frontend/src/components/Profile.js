import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from "axios";

function Profile() {
    let bp = require("./Path.js");
    let user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState(user);
    const [showSaveChangesButton, setShowSaveChangesButton] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);
    const dispatch = useDispatch();

    const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

    function editProfile() {
        setShowSaveChangesButton(true);
        setShowEditButton(false);
    }

    async function saveChanges() {
        await axios
            .post(bp.buildPath("api/edit-profile"), {
                userId: user.userId,
                newFirstName: userInfo.firstName,
                newLastName: userInfo.lastName,
                newProfileDescription: userInfo.profileDescription,
                newProfilePicture: userInfo.profilePicture,
                jwtToken: user.jwtToken,
            })
            .then(function (response) {
                updateCurrentUser({
                    userId: user.userId,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    profileDescription: userInfo.profileDescription,
                    profilePicture: userInfo.profilePicture,
                    jwtToken: response.refreshedToken,
                });
            })
            .catch(function (response) {
                console.log(response);
            });
        setShowSaveChangesButton(false);
        setShowEditButton(true);
    }

    function cancelChanges() {
        setShowSaveChangesButton(false);
        setShowEditButton(true);
        setUserInfo(user);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        id="firstName"
                        label="Outlined"
                        variant="outlined"
                        value={userInfo.firstName}
                        disabled={showEditButton}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, firstName: e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        id="lastName"
                        label="Outlined"
                        variant="outlined"
                        value={userInfo.lastName}
                        disabled={showEditButton}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, lastName: e.target.value })
                        }
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        id="description"
                        label="Outlined"
                        variant="outlined"
                        value={userInfo.profileDescription}
                        disabled={showEditButton}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, profileDescription: e.target.value })
                        }
                    />
                </Grid>
            </Grid>
            {showEditButton && (
                <Button variant="contained" onClick={() => editProfile()}>
                    Edit Profile
                </Button>
            )}
            {showSaveChangesButton && (
                <Button variant="contained" onClick={() => saveChanges()}>
                    Save Changes
                </Button>
            )}
            {showSaveChangesButton && (
                <Button variant="contained" onClick={() => cancelChanges()}>
                    Cancel Changes
                </Button>
            )}
        </Container>
    );
}

export default Profile;
