import React, { useState, useEffect } from 'react';
import {
  collection, onSnapshot, query,
} from 'firebase/firestore';
import { Spinner } from 'reactstrap';
import {
  DndContext, PointerSensor, closestCorners, useDroppable, useSensor, DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext, horizontalListSortingStrategy, arrayMove, useSortable,
} from '@dnd-kit/sortable';
import NavBar from '../../components/NavBar/navBar.component';
import List from '../../components/List/list.component';
import { database } from '../../firebase';
import { UserAuth } from '../../context/authContext';
import ListBox from './homePage.styles';

const HomePage = () => {
  const [ listsFromDB, setListsFromDB ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const { user } = UserAuth();

  const getTasks = async () => {
    setIsLoading(true);
    const dbQuery = query(collection(database, `lists-${user?.uid}`));
    onSnapshot(dbQuery, (snapshot) => {
      setListsFromDB(snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })));
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const { setListNodeRef } = useDroppable({
    id: `droppable-lists-${user?.uid}`,
  });

  const sensors = [ useSensor(PointerSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  }) ];

  const [ draggedItem, setDraggedItem ] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const item = listsFromDB.find((list) => list.id === active.id);
    if (item) {
      setDraggedItem(item);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setListsFromDB((prevLists) => {
        const oldIndex = prevLists.findIndex((list) => list.id === active.id);
        const newIndex = prevLists.findIndex((list) => list.id === over.id);
        return arrayMove(prevLists, oldIndex, newIndex);
      });
    }
    setDraggedItem(null);
  };

  // todo: update lists order in database

  return (
    <>
      {isLoading && <Spinner />}
      <NavBar />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ListBox ref={setListNodeRef}>
          <SortableContext
            items={listsFromDB.map((list) => list.id)}
            strategy={horizontalListSortingStrategy}
          >
            {listsFromDB.map((list) => (
              <List
                key={list.id}
                id={list.id}
                title={list.title}
                tasks={list.tasks}
              />
            ))}
          </SortableContext>
        </ListBox>
        <DragOverlay>
          {draggedItem && <List id={draggedItem.id} title={draggedItem.title} tasks={draggedItem.tasks} />}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default HomePage;
