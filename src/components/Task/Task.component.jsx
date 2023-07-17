import React from 'react';
import { TaskTitle, TaskContainer, MenuIcon } from './Task.styles';

const Task = ({ title }) => {
    return (
        <TaskContainer>  
            <TaskTitle>{title}</TaskTitle>
            <MenuIcon />
        </TaskContainer>
    );
};

export default Task;