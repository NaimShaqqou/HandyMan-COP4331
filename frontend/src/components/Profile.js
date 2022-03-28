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
    const [fileData, setFileData] = useState();
    const dispatch = useDispatch();

    const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

    function editProfile() {
        setShowSaveChangesButton(true);
        setShowEditButton(false);
    }

    const handleImageChange = ({ target }) => {
        setFileData(target.files[0])
        setUserInfo({ ...userInfo, profilePicture: URL.createObjectURL(target.files[0]) })
    }

    async function uploadImage() {
        const formData = new FormData()
        formData.append("image", fileData)
        let imageUrl;

        await axios({
            method: "post",
            url: bp.buildPath("api/store-image"),
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                imageUrl = response.data.imageUrl;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

        return imageUrl;
    }

    async function saveChanges() {
        let newImageUrl = await uploadImage()

        await axios
            .post(bp.buildPath("api/edit-profile"), {
                userId: user.userId,
                newFirstName: userInfo.firstName,
                newLastName: userInfo.lastName,
                newProfileDescription: userInfo.profileDescription,
                newProfilePicture: newImageUrl,
                jwtToken: user.jwtToken,
            })
            .then(function (response) {
                updateCurrentUser({
                    userId: user.userId,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    profileDescription: userInfo.profileDescription,
                    profilePicture: newImageUrl,
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
        <Container alignItems="center">
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <img src={userInfo.profilePicture} />
                    {showSaveChangesButton && (
                            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
                        )}
                </Grid>
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between" direction="row" spacing={4}>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                required
                                id="firstName"
                                label="First Name"
                                variant="outlined"
                                value={userInfo.firstName}
                                disabled={showEditButton}
                                error={userInfo.firstName === ""}
                                helperText={
                                    userInfo.firstName === "" ? "First Name is required!" : " "
                                }
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, firstName: e.target.value })
                                }
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                required
                                id="lastName"
                                label="Last Name"
                                variant="outlined"
                                value={userInfo.lastName}
                                disabled={showEditButton}
                                error={userInfo.lastName === ""}
                                helperText={
                                    userInfo.lastName === "" ? "Last Name is required!" : " "
                                }
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, lastName: e.target.value })
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent="flex-start" spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={userInfo.profileDescription}
                                disabled={showEditButton}
                                onChange={(e) =>
                                    setUserInfo({ ...userInfo, profileDescription: e.target.value })
                                }
                            />
                        </Grid>
                        {showEditButton && (
                            <Grid item>
                                <Button variant="contained" onClick={() => editProfile()}>
                                    Edit Profile
                                </Button>
                            </Grid>

                        )}
                        {showSaveChangesButton && (
                            <Grid item>
                                <Button variant="contained" onClick={() => saveChanges()}>
                                    Save Changes
                                </Button>
                            </Grid>

                        )}
                        {showSaveChangesButton && (
                            <Grid item>
                                <Button variant="contained" onClick={() => cancelChanges()}>
                                    Cancel Changes
                                </Button>
                            </Grid>

                        )}
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
}

export default Profile;
