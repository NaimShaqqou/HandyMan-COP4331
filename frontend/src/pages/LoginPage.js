import React from 'react';

import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import LoginBox from '../components/LoginBox';
import '../LoginPage.css';

const LoginPage = () =>
{
    return(
        <div class='loginPageDiv'>
            <Logo />
            <PageTitle />
            <LoginBox />
            
        </div>
    );
};

export default LoginPage;