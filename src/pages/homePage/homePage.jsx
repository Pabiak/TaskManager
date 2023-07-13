import React from "react";
import NavBar from "../../components/NavBar/NavBar.component";
import List from "../../components/List/List.component";
import styled from "styled-components";

const ListBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
`;

const HomePage = () => {
    return (
        <>
            <NavBar />
            <ListBox>
                <List />
                <List />
                <List />
            </ListBox>
        </>
    );
};

export default HomePage;
