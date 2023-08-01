/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import { database } from '../../firebase';

import { TaskTitle, TaskContainer, EditTaskField } from './Task.styles';
import { EditIconsBox, ConfirmIcon, CancelIcon } from '../List/List.styles';
import PopupMenu from '../PopupMenu/PopupMenu.component';

const Task = ({
  id, listId, title, removeTaskFromList,
}) => {
  const [ newTitle, setNewTitle ] = useState(title);
  const [ editClicked, setEditClicked ] = useState(false);
  const { user } = UserAuth();

  const editRef = useRef(false);

  const handleTitleChange = (e) => {
    editRef.current = true;
    setNewTitle(e.target.value);
  };

  const handleEditClicked = () => {
    setEditClicked(!editClicked);
  };

  const handleCancel = () => {
    editRef.current = false;
    setEditClicked(false);
    setNewTitle(title);
  };

  const handleConfirm = async () => {
    setEditClicked(false);
    if (!editRef.current) return;
    const listDoc = doc(database, `lists-${user?.uid}`, listId);
    const taskToEdit = {
      id,
      title: newTitle,
    };

    const docSnapshot = await getDoc(listDoc);
    if (!docSnapshot.exists()) return;

    const { tasks } = docSnapshot.data();
    const index = tasks.findIndex((task) => task.id === taskToEdit.id);

    if (index === -1) return;

    tasks[index] = taskToEdit;
    await updateDoc(listDoc, { tasks });
    editRef.current = false;
  };

  const handleRemoveTask = () => {
    const taskToRemove = {
      id,
      title,
    };
    removeTaskFromList(listId, taskToRemove);
  };

  return (
    <TaskContainer>
      {editClicked ? (
        <EditTaskField
          type="textarea"
          value={newTitle}
          onChange={(e) => handleTitleChange(e)}
          // onBlur={handleConfirm}
          // autoFocus
          // todo: wymyslic sposob na to zeby dalo się mieć włączony tylko jeden input
        />
      ) : (
        <TaskTitle>{title}</TaskTitle>
      )}
      {editClicked ? (
        <EditIconsBox>
          <ConfirmIcon
            id={`confirmButton_${id}`}
            onClick={handleConfirm}
          />
          <CancelIcon
            id={`cancelButton_${id}`}
            onClick={handleCancel}
          />
        </EditIconsBox>
      ) : (
        <PopupMenu onEditClick={handleEditClicked} onDeleteClick={handleRemoveTask} />
      )}

    </TaskContainer>
  );
};
export default Task;

Task.propTypes = {
  id: PropTypes.string,
  listId: PropTypes.string,
  title: PropTypes.string,
  removeTaskFromList: PropTypes.func,
};

Task.defaultProps = {
  id: '',
  listId: '',
  title: '',
  removeTaskFromList: () => {},
};
