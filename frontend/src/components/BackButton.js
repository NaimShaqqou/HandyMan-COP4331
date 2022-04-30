import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import axios from 'axios';

export default function BackButton() {
    const navigate = useNavigate();
    let location = useLocation();
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { logoutUser, updateCurrentUser } = bindActionCreators(actionCreators, dispatch);
    const bp = require("./Path");

    async function goBack() {
        let route = location.pathname;
        console.log(route)

        if (user.jwtToken === "") {
            if (route === '/search') {
                navigate("../")
            } else if (route === '/service') {
                navigate(-1)
            }
        } else {
            axios.post(bp.buildPath("api/refresh-token"), { jwtToken: user.jwtToken }).then((response) => {
                if (response.data.refreshedToken === "") {
                    logoutUser();
                    navigate("../login");
                } else {
                    updateCurrentUser({ ...user, jwtToken: response.data.refreshedToken })
                    if (route === '/edit-service') {
                        navigate("../services")
                    } else if (route === '/add-service') {
                        navigate("../services")
                    } else if (route === '/profile') {
                        navigate("../")
                    } else if (route === '/user-requested-services') {
                        navigate("../")
                    } else if (route === '/requested-services') {
                        navigate("../services")
                    } else if (route === '/services') {
                        navigate("../")
                    } else if (route === '/search') {
                        navigate("../")
                    } else if (route === '/service') {
                        navigate(-1)
                    }
                }
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }


    return (
        <IconButton onClick={() => goBack()}>
            <ArrowBackIcon sx={{ color: 'white' }} />
        </IconButton>
    )
}

