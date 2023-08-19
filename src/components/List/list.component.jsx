/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DndContext, PointerSensor, closestCorners, useSensor,
  useDroppable, DragOverlay,
} from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  doc, updateDoc, arrayRemove, arrayUnion, deleteDoc,
} from 'firebase/firestore';
import { Tooltip } from 'reactstrap';
import {
  SortableContext, verticalListSortingStrategy, arrayMove, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  DragHandle,
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
  const [ draggedItem, setDraggedItem ] = useState(null);
  const { user } = UserAuth();
  const { t } = useTranslation();
  const [ taskArray, setTaskArray ] = useState(JSON.parse(JSON.stringify(tasks)));

  useEffect(() => {
    setTaskArray(JSON.parse(JSON.stringify(tasks)));
  }, [ tasks ]);

  const addTaskToList = async () => {
    const listDoc = doc(database, `lists-${user?.uid}`, id);

    const newTask = {
      id: crypto.randomUUID(),
      title: t('list.initialTaskTitle'),
      label: null,
      deadline: null,
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

  const updateTasksInList = async (listId, tasksToUpdate) => {
    const listDoc = doc(database, `lists-${user?.uid}`, listId);
    await updateDoc(listDoc, {
      tasks: tasksToUpdate,
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

  const { setTaskNodeRef } = useDroppable({
    id: `droppable-${id}`,
  });

  const sensors = [ useSensor(PointerSensor) ];

  const handleDragStart = (event) => {
    const { active } = event;
    const item = taskArray.find((task) => task.id === active.id);
    if (item) {
      setDraggedItem(item);
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTaskArray((prevTasks) => {
        const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
        const newIndex = prevTasks.findIndex((task) => task.id === over.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    updateTasksInList(id, taskArray);
  }, [ taskArray ]);

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
    opacity: isDragging ? 0 : 1,
  };
  return (
    <ListContainer ref={setNodeRef} style={style}>
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
          <>
            <DragHandle {...attributes} {...listeners} />
            <ListTitle>{title}</ListTitle>
          </>
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <TaskContainer ref={setTaskNodeRef}>
          <SortableContext
            items={taskArray.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {taskArray.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                listId={id}
                title={task.title}
                label={task.label}
                deadline={task.deadline}
                removeTaskFromList={removeTaskFromList}
              />
            ))}
          </SortableContext>
        </TaskContainer>
        <DragOverlay>
          {draggedItem && (
            <Task
              id={draggedItem.id}
              listId={id}
              title={draggedItem.title}
              label={draggedItem.label}
              deadline={draggedItem.deadline}
              removeTaskFromList={removeTaskFromList}
            />
          )}
        </DragOverlay>
      </DndContext>
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
