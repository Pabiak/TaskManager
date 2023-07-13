import React from 'react';

import {
    LoginContainer,
    ButtonContainer,
    LoginText,
    LoginButton,
    LoginBox,
    Svg
} from './loginPage.styles';

const LoginPage = () => {
    return (
        <LoginContainer>
            <LoginBox>
                <LoginText>
                    Zaloguj się
                </LoginText>
                <ButtonContainer>
                    <LoginButton>
                        Zaloguj się przez Facebook
                    </LoginButton>
                    <LoginButton>
                        Zaloguj się przez Google
                    </LoginButton>
                </ButtonContainer>
            </LoginBox>
            <Svg />
        </LoginContainer>
    );
};
export default LoginPage;
