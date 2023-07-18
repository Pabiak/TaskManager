import React from 'react';
import PropTypes from 'prop-types';

import { TaskTitle, TaskContainer, MenuIcon } from './Task.styles';

const Task = ({ title }) => (
  <TaskContainer>
    <TaskTitle>{title}</TaskTitle>
    <MenuIcon />
  </TaskContainer>
);

export default Task;

Task.propTypes = {
  title: PropTypes.string,
};

Task.defaultProps = {
  title: '',
};
