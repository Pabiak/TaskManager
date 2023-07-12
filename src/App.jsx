import React from 'react';
import ThemeProvider  from './Theme';
import List from './components/List/List.component';
import styled from 'styled-components';
import NavBar from './components/NavBar/NavBar.component';
import GlobalStyle from './GlobalStyles';

const ListBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    gap: 1rem;
`;

const App = () => {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <NavBar />
            <ListBox>
                <List />
                <List />
                <List />
            </ListBox>
        </ThemeProvider>
    );
};

export default App;
