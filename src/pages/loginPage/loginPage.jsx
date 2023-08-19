import React from 'react';
import {
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/authContext';

import {
  LoginContainer,
  ButtonContainer,
  LoginText,
  LoginBox,
  Svg,
  FlagContainer,
} from './loginPage.styles';

const LoginPage = () => {
  const { t, i18n } = useTranslation();
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
        <LoginText>{t('loginPage.signIn')}</LoginText>
        <ButtonContainer>
          <GoogleLoginButton onClick={hangleGoogleLogin}>
            <span>{t('loginPage.signInWithGoogle')}</span>
          </GoogleLoginButton>
          <GithubLoginButton onClick={hangleGoogleLogin}>
            <span>{t('loginPage.signInWithGithub')}</span>
          </GithubLoginButton>
        </ButtonContainer>
        <FlagContainer>
          {i18n.language === 'en' ? <ReactCountryFlag countryCode="PL" svg onClick={() => i18n.changeLanguage('pl')} />
            : <ReactCountryFlag countryCode="GB" svg onClick={() => i18n.changeLanguage('en')} />}
        </FlagContainer>
      </LoginBox>
      <Svg />
    </LoginContainer>
  );
};
export default LoginPage;
