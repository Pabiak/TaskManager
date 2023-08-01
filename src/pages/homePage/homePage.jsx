import React, { useState, useEffect } from 'react';
import {
  collection, onSnapshot, query,
} from 'firebase/firestore';
import { Spinner } from 'reactstrap';
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

  return (
    <>
      {isLoading && <Spinner />}
      <NavBar />
      <ListBox>
        {listsFromDB.map((list) => (
          <List
            key={list.id}
            id={list.id}
            title={list.title}
            tasks={list.tasks}
          />
        ))}
      </ListBox>
    </>
  );
};

export default HomePage;
