import React from 'react';
import {
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';
import { UserAuth } from '../../context/AuthContext';

import {
  LoginContainer,
  ButtonContainer,
  LoginText,
  LoginBox,
  Svg,
} from './loginPage.styles';

const LoginPage = () => {
  const { signInWithGoogle } = UserAuth();
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
