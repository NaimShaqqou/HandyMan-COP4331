import React from 'react';
import '../Title.css'
import { useNavigate } from "react-router-dom";
function Logo(){
    const navigate = useNavigate()
    return (
        <div>
            <p className="logo"><a href="/" >Handler</a></p>
        </div>

    )
}

export default Logo;