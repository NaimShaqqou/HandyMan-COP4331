// ImageDisplay.js
import React, { useState } from 'react';
import axios from 'axios';

// This is for testing image storing

export default function ImageDisplay() { 
    var bp = require("./Path.js");
    const [fileData, setFileData] = useState();
    const [images, setFile] = useState("");

    const handleFileChange = ({target}) => {
        setFileData(target.files[0])
        setFile(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("image", fileData)
        formData.append("name", "Esteban")


        await axios({
            method: "post",
            url: bp.buildPath("api/store-image"),
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    }


    return (
        <form>
            <input 
                type="file"
                value={images}
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="upload image"
                isRequired={true}/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
        
    )
 }