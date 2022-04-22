import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles.css';

export default function EditService(props) {
    let originalService = props.service
    const navigate = useNavigate();
    let user = useSelector((state) => state.user);
    const bp = require("./Path");
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const categories = ["Baking", "Teaching", "Fixing", "Other"];

    originalService = originalService ? originalService : {Images: "", Category: "", Title: "", Description: "", Address: "", Price: "", DaysAvailable: ""};
   
    const [imageValidation, setImageValidation] = useState(false)
    const [images, setImages] = useState(originalService.Images);
    const [predictions, setPredictions] = useState(new Array());
    const [category, setCategory] = useState(originalService.Category);
    const [categoryValidation, setCategoryValidation] = useState(false);
    const [fileData, setFileData] = useState([]);
    const [title, setTitle] = useState(originalService.Title);
    const [titleValidation, setTitleValidation] = useState(false);
    const [description, setDescription] = useState(originalService.Description);
    const [descriptionValidation, setDescriptionalidation] = useState(false);
    const [location, setLocation] = useState(originalService.Address);
    const [locationValidation, setLocationValidation] = useState(false);
    const [price, setPrice] = useState(originalService.Price);
    const [priceValidation, setPriceValidation] = useState(false);
    const [availableDays, setAvailableDays] = useState(originalService.DaysAvailable)
    const [availableDaysValidation, setAvailableDaysValidation] = useState(false);

    const dispatch = useDispatch();
    const { updateServices, updateCurrentUser } = bindActionCreators(actionCreators, dispatch);


    const handleImageChange = ({ target }) => {
        setImageValidation(false)
        setImages((array) => [...array, URL.createObjectURL(target.files[0])])
        setFileData((array) => [...array, target.files[0]]);
    };

    async function editService() {
        if (title === "" || description === "" || location === "" || price === "" || availableDays.length === 0 || category === "" || images.length === 0) {
            if (title === "") setTitleValidation(true);
            if (description === "") setDescriptionalidation(true);
            if (location === "") setLocationValidation(true);
            if (price === "") setPriceValidation(true);
            if (category === "") setCategoryValidation(true);
            if (availableDays.length === 0) setAvailableDaysValidation(true)
            if (images.length === 0) setImageValidation(true)
            return;
        }

        let urlList = await convertToUrls()

        await axios.post(bp.buildPath("api/edit-service"), {
            serviceId: originalService._id,
            jwtToken: user.jwtToken,
            newTitle: title,
            newImages: urlList,
            newAddress: location,
            newDescription: description,
            newPrice: price,
            newDaysAvailable: availableDays,
            newCategory: category,
        }).then((response) => {
            let refreshedToken = response.data.refreshedToken
            updateCurrentUser({ ...user, jwtToken: refreshedToken })
            updateServices(response.data.service)
            navigate(-1)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    async function convertToUrls() {
        let urls = images.filter((url) => url.includes("cloudinary"))

        // Can change to map function to call all promises at the same time
        for (const file of fileData) {
            const formData = new FormData();
            formData.append("image", file);

            await axios({
                method: "post",
                url: bp.buildPath("api/store-image"),
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    urls.push(response.data.imageUrl);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }

        return urls
    }

    function removeImage(imageIndex) {
        if (images.length !== fileData.length) {
            setImages(images.filter((image, index) => {
                if (index !== imageIndex) return image
            }))
            setFileData(fileData.filter((file, index) => {
                if (index !== (imageIndex - images.length)) return file
            }))
        } else {
            setImages(images.filter((image, index) => {
                if (index !== imageIndex) return image
            }))
            setFileData(fileData.filter((file, index) => {
                if (index !== imageIndex) return file
            }))
        }
    }

    function removeAllImages() {
        setImages([])
        setFileData([])
    }

    async function findPredictions() {
        await axios
            .post(bp.buildPath("api/autocomplete-address"), { input: location })
            .then((response) => {
                setPredictions(response.data.predictions);
            })
            .catch((error) => console.log(error));
    }

    return (
        <Container>
            <Box sx={{ pt: 3 }}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            {images.map((image, index) => (

                                <div key={index} className="shrink">
                                    <img src={image} key={index} alt="" width="100" onClick={() => removeImage(index)} />
                                </div>

                            ))}
                        </Stack>
                        {imageValidation && <span>Need to set at least one photo for your service!</span>}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                        />
                        <button onClick={() => removeAllImages()}>Remove all images</button>

                    </Grid>
                    <Grid item>
                        <Typography sx={{ pb: 2 }} fontWeight="bold">
                            Title:
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            id="title"
                            label="Title"
                            value={title}
                            variant="outlined"
                            error={titleValidation === true}
                            helperText={
                                titleValidation === true
                                    ? "Title can't be empty!"
                                    : " "
                            }
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setTitleValidation(false)
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography sx={{ pb: 2 }} fontWeight="bold">
                            Description:
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={description}
                            id="description"
                            label="Description"
                            variant="outlined"
                            error={descriptionValidation === true}
                            helperText={
                                descriptionValidation === true
                                    ? "Description can't be empty!"
                                    : " "
                            }
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setDescriptionalidation(false);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography sx={{ pb: 2 }} fontWeight="bold">
                            Location:
                        </Typography>
                        <Autocomplete
                            options={predictions.map((prediction) => prediction)}
                            value={location}
                            onChange={(e, value) => {
                                value === null ? setLocation("") : setLocation(value)
                                setLocationValidation(false);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        type: "text"
                                    }}
                                    error={locationValidation === true}
                                    helperText={
                                        locationValidation === true
                                            ? "Address can't be empty!"
                                            : " "
                                    }
                                    onChange={async (e) => {
                                        setLocation(e.target.value)
                                        setLocationValidation(false);
                                        await findPredictions();
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item>
                        <Typography sx={{ pb: 2 }} fontWeight="bold">
                            Price:
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            rows={4}
                            value={price}
                            type="number"
                            id="price"
                            label="Price"
                            variant="outlined"
                            error={priceValidation === true}
                            helperText={
                                priceValidation === true
                                    ? "Price can't be empty!"
                                    : " "
                            }
                            onChange={(e) => {
                                setPrice(e.target.value)
                                setPriceValidation(false);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent="space-between"
                            direction="row"
                            spacing={5}>
                            <Grid item xs={6}>
                                <Typography sx={{ pb: 2 }} fontWeight="bold">
                                    Days Available:
                                </Typography>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={days}
                                    value={availableDays}
                                    getOptionLabel={(option) => option}
                                    filterSelectedOptions
                                    fullWidth
                                    onChange={(e, value) => {
                                        setAvailableDays(value)
                                        setAvailableDaysValidation(false)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Available Days to Work"
                                            placeholder="Week Days"
                                            error={availableDaysValidation === true}
                                            helperText={
                                                availableDaysValidation === true
                                                    ? "Must select at least one day!"
                                                    : " "
                                            }
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ pb: 2 }} fontWeight="bold">
                                    Category:
                                </Typography>
                                <TextField
                                    id="category"
                                    select
                                    label="Select the category of your service"
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                        setCategoryValidation(false)
                                    }}
                                    value={category}
                                    fullWidth
                                    error={categoryValidation === true}
                                    helperText={
                                        categoryValidation === true
                                            ? "Must select a category!"
                                            : " "
                                    }
                                >
                                    {categories.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={4}>
                            <Button variant="contained" onClick={async () => await editService()}>Update Service</Button>
                            <Button variant="contained" onClick={() => navigate(-1)}>Cancel Changes</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </Container >
    );
}
