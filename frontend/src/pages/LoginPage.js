import React from 'react';

import PageTitle from '../components/PageTitle';
import Title from '../components/Title';
import LoginBox from '../components/LoginBox';
import '../LoginPage.css';

const LoginPage = () =>
{
    return(
        <div class='loginPageDiv'>
            <Title />
            <PageTitle />
            <LoginBox />
        </div>
    );
};

export default LoginPage;