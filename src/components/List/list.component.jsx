/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  doc, updateDoc, arrayRemove, arrayUnion, deleteDoc,
} from 'firebase/firestore';
import { Tooltip } from 'reactstrap';
import { database } from '../../firebase';
import { UserAuth } from '../../context/authContext';
import Task from '../Task/task.component';
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
} from './list.styles';
import ConfirmDeleteModal from '../ConfirmDeleteModal/confirmDeleteModal.component';

const List = ({
  id, title, tasks,
}) => {
  const [ editClicked, setEditClicked ] = useState(false);
  const [ newTitle, setNewTitle ] = useState(title);
  const [ isConfirmTooltipOpen, setIsConfirmTooltipOpen ] = useState(false);
  const [ isCancelTooltipOpen, setIsCancelTooltipOpen ] = useState(false);
  const [ isEditTooltipOpen, setIsEditTooltipOpen ] = useState(false);
  const [ isDeleteTooltipOpen, setIsDeleteTooltipOpen ] = useState(false);
  const [ isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen ] = useState(false);
  const { user } = UserAuth();
  const { t } = useTranslation();

  const addTaskToList = async () => {
    const listDoc = doc(database, `lists-${user?.uid}`, id);

    const newTask = {
      id: crypto.randomUUID(),
      title: t('list.initialTaskTitle'),
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
    setIsCancelTooltipOpen(false);
    setIsDeleteTooltipOpen(false);
    setIsEditTooltipOpen(false);
    setNewTitle(title);
  };

  const handleConfirm = async () => {
    setEditClicked(false);
    setIsConfirmTooltipOpen(false);
    setIsDeleteTooltipOpen(false);
    setIsEditTooltipOpen(false);
    const listDoc = doc(database, `lists-${user?.uid}`, id);
    await updateDoc(listDoc, {
      title: newTitle,
    });
  };

  const toggleConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(!isConfirmDeleteModalOpen);

  const toggleConfirmTooltip = () => setIsConfirmTooltipOpen(!isConfirmTooltipOpen);
  const toggleCancelTooltip = () => setIsCancelTooltipOpen(!isCancelTooltipOpen);
  const toggleEditTooltip = () => setIsEditTooltipOpen(!isEditTooltipOpen);
  const toggleDeleteTooltip = () => setIsDeleteTooltipOpen(!isDeleteTooltipOpen);

  return (
    <ListContainer>
      <ConfirmDeleteModal
        open={isConfirmDeleteModalOpen}
        toggle={toggleConfirmDeleteModal}
        title={title}
        confirmDeleteAction={deleteList}
      />
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
            {/* zindex needed to prevent tooltip flickering */}
            <ConfirmIcon
              id={`confirmButton_${id}`}
              onClick={handleConfirm}
              style={{ zIndex: '2000' }}
            />
            {/* zindex needed to prevent tooltip flickering */}
            <CancelIcon
              id={`cancelButton_${id}`}
              onClick={handleCancel}
              style={{ zIndex: '2000' }}
            />
            {editClicked && <Tooltip isOpen={isConfirmTooltipOpen} target={`confirmButton_${id}`} toggle={toggleConfirmTooltip} placement="top">{t('toolTip.confirm')}</Tooltip>}
            {editClicked && <Tooltip isOpen={isCancelTooltipOpen} target={`cancelButton_${id}`} toggle={toggleCancelTooltip} placement="top">{t('toolTip.cancel')}</Tooltip>}
          </EditIconsBox>
        ) : (
          <MenuIconsBox>
            {/* zindex needed to prevent tooltip flickering */}
            <EditIcon id={`editButton_${id}`} onClick={() => setEditClicked(!editClicked)} style={{ zIndex: '2000' }} />
            <DeleteIcon id={`deleteButton_${id}`} onClick={toggleConfirmDeleteModal} style={{ zIndex: '2000' }} />
            <Tooltip isOpen={isEditTooltipOpen} target={`editButton_${id}`} toggle={toggleEditTooltip} placement="top">{t('toolTip.editList')}</Tooltip>
            <Tooltip isOpen={isDeleteTooltipOpen} target={`deleteButton_${id}`} toggle={toggleDeleteTooltip} placement="top">{t('toolTip.deleteList')}</Tooltip>
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
        {t('list.addTask')}
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
