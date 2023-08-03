import styled from 'styled-components';
import { ReactComponent as LoginBackground } from '../../assets/svg/loginPageBackground.svg';

export const Svg = styled(LoginBackground)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: block;
    background-color: #0e4166;
    background-image: linear-gradient(
        to bottom,
        rgba(14, 65, 102, 0.86),
        #0e4166
    );
`;

export const LoginBody = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const LoginBox = styled.div`
    width: 30rem;
    height: fit-content;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 2rem 3rem 3rem 3rem;
    z-index: 1;
`;

export const LoginText = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xl3};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 1rem;
`;

export const FlagContainer = styled.div`
    display: flex;
    background-color: #eee;
    padding: .2rem 0;
    align-items: center;
    margin-top: .5rem;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.xl2};
    cursor: pointer;
`;
