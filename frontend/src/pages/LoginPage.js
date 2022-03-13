import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Register from '../components/Register';

import '../LoginPage.css';

const LoginPage = () =>
{
    return(
        <div class='loginPageDiv'>
            <Image />
            <PageTitle />
            <Login />
            <br />
            <Register />
        </div>
    );
};

export default LoginPage;