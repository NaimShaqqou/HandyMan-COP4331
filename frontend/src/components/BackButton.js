import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    let location = useLocation();

    function goBack() {
        let route = location.pathname;
        console.log(route)

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


    return (
        <IconButton onClick={() => goBack()}>
                <ArrowBackIcon sx={{ color: 'white'}}/>
        </IconButton>
    )
}

