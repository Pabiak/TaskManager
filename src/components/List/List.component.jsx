/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  doc, updateDoc, arrayRemove, arrayUnion, deleteDoc,
} from 'firebase/firestore';
import { database } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import Task from '../Task/Task.component';
import {
  ListContainer,
  ListUpperBar,
  TaskContainer,
  DeleteIcon,
  ListTitle,
  AddTaskButton,
  MenuIconsBox,
  EditListField,
  EditIconsBox,
  CancelIcon,
  ConfirmIcon,
  EditIcon,
} from './List.styles';

const List = ({
  id, title, tasks,
}) => {
  const [ editClicked, setEditClicked ] = useState(false);
  const [ newTitle, setNewTitle ] = useState(title);
  const { user } = UserAuth();

  const addTaskToList = async () => {
    const listDoc = doc(database, `lists-${user?.uid}`, id);

    const newTask = {
      id: crypto.randomUUID(),
      title: 'Nowe zadanie',
    };

    await updateDoc(listDoc, {
      tasks: arrayUnion(newTask),
    });
  };

  const removeTaskFromList = async (listId, taskToRemove) => {
    const listDoc = doc(database, `lists-${user?.uid}`, listId);

    await updateDoc(listDoc, {
      tasks: arrayRemove(taskToRemove),
    });
  };

  const deleteList = async () => {
    const listDoc = doc(database, `lists-${user?.uid}`, id);
    await deleteDoc(listDoc);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleCancel = () => {
    setEditClicked(false);
    setNewTitle(title);
  };

  const handleConfirm = async () => {
    setEditClicked(false);
    const listDoc = doc(database, `lists-${user?.uid}`, id);
    await updateDoc(listDoc, {
      title: newTitle,
    });
  };

  return (
    <ListContainer>
      <ListUpperBar>
        {editClicked ? (
          <EditListField
            type="textarea"
            value={newTitle}
            onChange={(e) => handleTitleChange(e)}
            // onBlur={() => setEditClicked(false)}
            // autoFocus
            // todo: wymyslic sposob na to zeby dalo się mieć włączony tylko jeden input
          />
        ) : (
          <ListTitle>{title}</ListTitle>
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
          <MenuIconsBox>
            <EditIcon onClick={() => setEditClicked(!editClicked)} />
            <DeleteIcon onClick={deleteList} />
          </MenuIconsBox>
        )}
      </ListUpperBar>
      <TaskContainer>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            listId={id}
            title={task.title}
            removeTaskFromList={removeTaskFromList}
          />
        ))}
      </TaskContainer>
      <AddTaskButton onClick={addTaskToList}>
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
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  id: PropTypes.string,
};

List.defaultProps = {
  title: '',
  tasks: [],
  id: '',
};
