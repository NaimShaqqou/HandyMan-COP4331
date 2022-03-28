import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function Profile() {
    let bp = require("./Path.js");
    let user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    const [showSaveChangesButton, setShowSaveChangesButton] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);
    const [fileData, setFileData] = useState();
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const [changePasswordMessage, setChangePasswordMessage] = useState("");
    const [newPasswordValidation, setNewPasswordValidation] = useState(false);
    const [oldPasswordValidation, setOldPasswordValidation] = useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setChangePasswordMessage("");
        setPassword({ oldPassword: "", newPassword: "" });
        setNewPasswordValidation(false);
        setOldPasswordValidation(false);
    };
    const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

    function editProfile() {
        setShowSaveChangesButton(true);
        setShowEditButton(false);
    }

    const handleImageChange = ({ target }) => {
        setFileData(target.files[0]);
        setUserInfo({
            ...userInfo,
            profilePicture: URL.createObjectURL(target.files[0]),
        });
    };

    async function uploadImage() {
        const formData = new FormData();
        formData.append("image", fileData);
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
        let newImageUrl = await uploadImage();

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

    async function changePassword() {
        let message;
        if (password.oldPassword === "" || password.newPassword === "") {
            if (password.oldPassword === "") setOldPasswordValidation(true);
            if (password.newPassword === "") setNewPasswordValidation(true);
            return;
        }
        await axios
            .post(bp.buildPath("api/change-password"), {
                userId: userInfo.userId,
                oldPassword: password.oldPassword,
                newPassword: password.newPassword,
                jwtToken: userInfo.jwtToken,
            })
            .then((response) => {
                if (response.data.error === "") {
                    message = "Successfully changed password.";
                } else {
                    message = response.data.error;
                }
                setChangePasswordMessage(message);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Container alignItems="center">
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <img src={userInfo.profilePicture} />
                    {showSaveChangesButton && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                        />
                    )}
                </Grid>
                <Grid item>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        direction="row"
                        spacing={4}
                    >
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
                                    setUserInfo({
                                        ...userInfo,
                                        profileDescription: e.target.value,
                                    })
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
                        {showEditButton && (
                            <Grid item>
                                <Button variant="contained" onClick={handleOpen}>
                                    Change Password
                                </Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    label="Old Password"
                                                    required
                                                    variant="outlined"
                                                    error={oldPasswordValidation === true}
                                                    helperText={
                                                        oldPasswordValidation === true
                                                            ? "Can't be empty!"
                                                            : " "
                                                    }
                                                    onChange={(e) => {
                                                        setPassword({
                                                            ...password,
                                                            oldPassword: e.target.value,
                                                        });
                                                        setOldPasswordValidation(false);
                                                    }}
                                                ></TextField>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    label="New Password"
                                                    required
                                                    variant="outlined"
                                                    error={newPasswordValidation === true}
                                                    helperText={
                                                        newPasswordValidation === true
                                                            ? "Can't be empty!"
                                                            : " "
                                                    }
                                                    onChange={(e) => {
                                                        setPassword({
                                                            ...password,
                                                            newPassword: e.target.value,
                                                        });
                                                        setNewPasswordValidation(false);
                                                    }}
                                                ></TextField>
                                            </Grid>
                                            <span>{changePasswordMessage}</span>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    onClick={async () => await changePassword()}
                                                >
                                                    Confirm
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Modal>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;
