import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Container } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

export default function AddService() {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const categories = ["Baking", "Teaching", "Fixing"];

    const [category, setCategory] = useState();
    const [fileData, setFileData] = useState([]);
    const [title, setTitle] = useState("");
    const [titleValidation, setTitleValidation] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionValidation, setDescriptionalidation] = useState(false);
    const [location, setLocation] = useState("");
    const [locationValidation, setLocationValidation] = useState(false);
    const [price, setPrice] = useState("");
    const [priceValidation, setPriceValidation] = useState(false);

    const handleImageChange = ({ target }) => {
        setFileData((array) => [...array, target.files[0]]);
    };

    function addService() {
        if (title === "" || description === "" || location === "" || price === "") {
            if (title === "") setTitleValidation(true);
            if (description === "") setDescriptionalidation(true);
            if (location === "") setLocationValidation(true);
            if (price === "") setPriceValidation(true);
            return;
        }
    }

    return (
        <Container>
            <Grid container spacing={4} direction="column">
                <Grid item>
                    <TextField
                        fullWidth
                        required
                        id="title"
                        label="Title"
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
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={4}
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
                    <TextField
                        fullWidth
                        required
                        id="location"
                        label="Location"
                        variant="outlined"
                        error={locationValidation === true}
                        helperText={
                            locationValidation === true
                                ? "Location can't be empty!"
                                : " "
                        }
                        onChange={(e) => {
                            setLocation(e.target.value)
                            setLocationValidation(false);
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        required
                        rows={4}
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
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={days}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Available Days to Work"
                                placeholder="Week Days"
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="category"
                        select
                        label="Select the category of your service"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Button variant="contained" onClick={() => addService()}>Save Service</Button>
            </Grid>
        </Container>
    );
}
