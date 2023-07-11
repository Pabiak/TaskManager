import React from 'react';
import styled from 'styled-components';
import ThemeProvider  from './Theme';

const StyledApp = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    color: ${({ theme }) => theme.colors.white};
    height: 10rem;
    width: 10rem;
`;

const App = () => {
    return (
        <ThemeProvider>
            <StyledApp> Hello World </StyledApp>
        </ThemeProvider>
    );
};

export default App;
