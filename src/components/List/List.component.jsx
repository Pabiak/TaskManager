import React from 'react';

import Task from '../Task/Task.component';
import {
    ListContainer,
    ListUpperBar,
    TaskContainer,
    MenuIcon,
    ListTitle,
    AddTaskButton,
    MenuIconBox
} from './List.styles';
import { AiOutlinePlus } from "react-icons/ai";

const List = () => {
    return (
        <ListContainer>
            <ListUpperBar>
                <ListTitle>Lista</ListTitle>
                <MenuIconBox>
                    <MenuIcon />
                </MenuIconBox>
            </ListUpperBar>
            <TaskContainer>
                <Task />
                <Task />
            </TaskContainer>
            <AddTaskButton><AiOutlinePlus />Dodaj Zadanie</AddTaskButton>
        </ListContainer>
    );
};

export default List;
