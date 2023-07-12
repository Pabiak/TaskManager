import React from 'react';
import ThemeProvider  from './Theme';
import List from './components/List/List.component';
import styled from 'styled-components';

const ListBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

const App = () => {
    return (
        <ThemeProvider>
            <ListBox>
                <List />
                <List />
                <List />
            </ListBox>
        </ThemeProvider>
    );
};

export default App;
