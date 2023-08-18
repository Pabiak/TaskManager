/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { Tooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PopupMenu from '../PopupMenu/popupMenu.component';
import { UserAuth } from '../../context/authContext';
import { database } from '../../firebase';
import {
  TaskTitle, TaskContainer, EditTaskField, DragHandle,
} from './task.styles';
import { EditIconsBox, ConfirmIcon, CancelIcon } from '../List/list.styles';
import TaskLabel from '../TaskLabel/TaskLabel.component';
import AddLabelModal from '../AddLabelModal/addLabelModal.component';

const Task = ({
  id, listId, title, label, removeTaskFromList,
}) => {
  const [ newTitle, setNewTitle ] = useState(title);
  const [ editClicked, setEditClicked ] = useState(false);
  const [ confirmTooltipOpen, setConfirmTooltipOpen ] = useState(false);
  const [ cancelTooltipOpen, setCancelTooltipOpen ] = useState(false);
  const { user } = UserAuth();
  const { t } = useTranslation();

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
    setCancelTooltipOpen(false);
  };

  const handleConfirm = async () => {
    setEditClicked(false);
    setConfirmTooltipOpen(false);
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

  const toggleConfirmTooltip = () => setConfirmTooltipOpen(!confirmTooltipOpen);
  const toggleCancelTooltip = () => setCancelTooltipOpen(!cancelTooltipOpen);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '0' : '1',
  };
  const [ isAddLabelModalOpen, setIsAddLabelModalOpen ] = useState(false);
  const toggleAddLabelModal = () => setIsAddLabelModalOpen(!isAddLabelModalOpen);

  const confirmAddLabelAction = async (priority) => {
    const taskToPutLabelOn = {
      id,
      title,
      label: priority,
    };
    const listDoc = doc(database, `lists-${user?.uid}`, listId);
    const docSnapshot = await getDoc(listDoc);
    if (!docSnapshot.exists()) return;

    const { tasks } = docSnapshot.data();
    const index = tasks.findIndex((task) => task.id === taskToPutLabelOn.id);

    if (index === -1) return;

    tasks[index] = taskToPutLabelOn;
    await updateDoc(listDoc, { tasks });
  };

  return (
    <TaskContainer ref={setNodeRef} style={style} hasLabel={!!label}>
      <AddLabelModal
        open={isAddLabelModalOpen}
        toggle={toggleAddLabelModal}
        confirmAddLabelAction={confirmAddLabelAction}
      />
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
        <div>
          {label && (
            <TaskLabel priority={label} />
          ) }
          <div>
            <DragHandle {...attributes} {...listeners} />
            <TaskTitle>{title}</TaskTitle>
          </div>
        </div>
      )}
      {editClicked ? (
        <EditIconsBox>
          {/* zindex needed to prevent tooltip flickering */}
          <div id={`confirmButton_${id}`} style={{ zIndex: '2000' }}>
            <ConfirmIcon
              onClick={handleConfirm}
            />
          </div>
          {/* zindex needed to prevent tooltip flickering */}
          <div id={`cancelButton_${id}`} style={{ zIndex: '2000' }}>
            <CancelIcon
              onClick={handleCancel}
            />
          </div>
        </EditIconsBox>
      ) : (
        <PopupMenu
          id={`menuButton_${id}`}
          onEditClick={handleEditClicked}
          onDeleteClick={handleRemoveTask}
          onAddLabelClick={toggleAddLabelModal}
        />
      )}
      {editClicked && <Tooltip isOpen={confirmTooltipOpen} target={`confirmButton_${id}`} toggle={toggleConfirmTooltip} placement="top">{t('toolTip.confirm')}</Tooltip>}
      {editClicked && <Tooltip isOpen={cancelTooltipOpen} target={`cancelButton_${id}`} toggle={toggleCancelTooltip} placement="top">{t('toolTip.cancel')}</Tooltip>}
    </TaskContainer>
  );
};
export default Task;

Task.propTypes = {
  id: PropTypes.string,
  listId: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  removeTaskFromList: PropTypes.func,
};

Task.defaultProps = {
  id: '',
  listId: '',
  title: '',
  label: null,
  removeTaskFromList: () => {},
};
