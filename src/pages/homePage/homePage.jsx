import React from 'react';
import styled from 'styled-components';
import NavBar from '../../components/NavBar/NavBar.component';
import List from '../../components/List/List.component';

const ListBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
`;

const Lists = [
  {
    id: 1,
    title: 'Lista 1',
    tasks: [
      {
        id: 1,
        title: 'Zadanie 1',
      },
      {
        id: 2,
        title: 'Zadanie 2',
      },
      {
        id: 3,
        title: 'Zadanie 3',
      },
    ],
  },
  {
    id: 2,
    title: 'Lista 2',
    tasks: [
      {
        id: 1,
        title: 'Zadanie 1',
      },
      {
        id: 2,
        title: 'Zadanie 2',
      },
    ],
  },
];

const HomePage = () => (
  <>
    <NavBar />
    <ListBox>
      {Lists.map((list) => (
        <List key={list.id} title={list.title} tasks={list.tasks} />
      ))}
    </ListBox>
  </>
);

export default HomePage;
