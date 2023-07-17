import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

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
        try{
            await signInWithGoogle();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(user != null) {
            // navigate('/');
            window.location.href = '/'
        }
    }, [ user ]);

    return (
        <LoginContainer>
            <LoginBox>
                <LoginText>Zaloguj się</LoginText>
                <ButtonContainer>
                    <LoginButton onClick={hangleGoogleLogin}>Zaloguj się przez Google</LoginButton>
                    <Link to='/'>
                        <button>HomePage</button>
                    </Link>
                </ButtonContainer>
            </LoginBox>
            <Svg />
        </LoginContainer>
    );
};
export default LoginPage;
