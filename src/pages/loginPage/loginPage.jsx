import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import {
    GoogleLoginButton,
    GithubLoginButton,
    AppleLoginButton,
    MetamaskLoginButton
} from 'react-social-login-buttons';

import {
    LoginContainer,
    ButtonContainer,
    LoginText,
    LoginButton,
    LoginBox,
    Svg,
} from './loginPage.styles';

const LoginPage = () => {
    const { signInWithGoogle, user } = UserAuth();
    const navigate = useNavigate();
    const hangleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LoginContainer>
            <LoginBox>
                <LoginText>Zaloguj się</LoginText>
                <ButtonContainer>
                    <GoogleLoginButton onClick={hangleGoogleLogin}>
                        <span>Zaloguj się przez Google</span>
                    </GoogleLoginButton>
                    <GithubLoginButton onClick={hangleGoogleLogin}>
                        <span>Zaloguj się przez GitHub</span>
                    </GithubLoginButton>
                </ButtonContainer>
            </LoginBox>
            <Svg />
        </LoginContainer>
    );
};
export default LoginPage;
