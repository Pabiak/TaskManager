import React, { useState } from 'react';

import Task from '../Task/Task.component';
import {
    ListContainer,
    ListUpperBar,
    TaskContainer,
    MenuIcon,
    ListTitle,
    AddTaskButton,
    MenuIconBox,
} from './List.styles';
import { AiOutlinePlus } from 'react-icons/ai';

const List = ({ id, title, tasks }) => {

    return (
        <ListContainer>
            <ListUpperBar>
                <ListTitle>{title}</ListTitle>
                <MenuIconBox>
                    <MenuIcon />
                </MenuIconBox>
            </ListUpperBar>
            <TaskContainer>
                {tasks.map((task) => (
                    <Task key={task.id} title={task.title} />
                ))}
            </TaskContainer>
            <AddTaskButton>
                <AiOutlinePlus />
                Dodaj Zadanie
            </AddTaskButton>
        </ListContainer>
    );
};

export default List;
