import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
    height: ${(props) => (props.small ? '1vh' : '100vh')};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoadingSpinner = styled.div`
    width: ${(props) => (props.small ? '20px' : '100px')};
    height: ${(props) => (props.small ? '20px' : '100px')};
    border: ${(props) =>
        props.small ? '1px solid #f3f3f3' : '10px solid #f3f3f3'};
    border-top: ${(props) =>
        props.small ? '3px solid #c0392b' : '10px solid #c0392b'};
    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite;
    margin-left: ${(props) => (props.small ? '4px' : '0')};
`;
