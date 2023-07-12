import React from 'react';
import { TaskTitle, TaskContainer, MenuIcon } from './Task.styles';

const Task = () => {
    return (
        <TaskContainer>  
            <TaskTitle>Task Title</TaskTitle>
            <MenuIcon />
        </TaskContainer>
    );
};

export default Task;