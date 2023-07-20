import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
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

const List = ({
  id, title, tasks, addTaskToList,
}) => {
  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: 'Nowe zadanie',
    };

    addTaskToList(id, newTask);
  };

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
      <AddTaskButton onClick={addTask}>
        <AiOutlinePlus />
        Dodaj Zadanie
      </AddTaskButton>
    </ListContainer>
  );
};
export default List;

List.propTypes = {
  title: PropTypes.string,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ),
  addTaskToList: PropTypes.func,
  id: PropTypes.number,
};

List.defaultProps = {
  title: '',
  tasks: [],
  addTaskToList: () => {},
  id: -1,
};
