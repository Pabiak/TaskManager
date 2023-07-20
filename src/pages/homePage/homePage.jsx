import React, { useState, useEffect } from 'react';
import {
  addDoc, collection, onSnapshot, query, updateDoc, doc, arrayUnion,
} from 'firebase/firestore';
import NavBar from '../../components/NavBar/NavBar.component';
import List from '../../components/List/List.component';
import { database } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import ListBox from './homePage.styles';

const HomePage = () => {
  const [ listsFromDB, setListsFromDB ] = useState([]);
  const { user } = UserAuth();

  const getTasks = async () => {
    const dbQuery = query(collection(database, `lists-${user?.uid}`));
    onSnapshot(dbQuery, (snapshot) => {
      setListsFromDB(snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })));
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addList = () => {
    const listCollection = collection(database, `lists-${user?.uid}`);
    addDoc(listCollection, {
      title: 'Lista',
      tasks: [],
    });
  };

  const addTaskToList = async (listId, newTask) => {
    const listDoc = doc(database, `lists-${user?.uid}`, listId);

    await updateDoc(listDoc, {
      tasks: arrayUnion(newTask),
    });
  };

  return (
    <>
      <NavBar addList={addList} />
      <ListBox>
        {listsFromDB.map((list) => (
          <List key={list.id} id={list.id} title={list.title} tasks={list.tasks} addTaskToList={addTaskToList} />
        ))}
      </ListBox>
    </>
  );
};

export default HomePage;
