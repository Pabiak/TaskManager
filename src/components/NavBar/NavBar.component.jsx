import React from 'react';
import PropTypes from 'prop-types';

import { collection, addDoc } from 'firebase/firestore';
import ReactCountryFlag from 'react-country-flag';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { database } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import {
  NavBarContainer,
  UserInfo,
  UserAvatar,
  UserName,
  AddListButton,
  LogOut,
  LogOutText,
  FlagContainer,
  LeftContainer,
  RightContainer,
  NightModeIcon,
} from './NavBar.styles';

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const addList = () => {
    const listCollection = collection(database, `lists-${user?.uid}`);
    addDoc(listCollection, {
      title: 'Lista',
      tasks: [],
    });
  };

  return (
    <NavBarContainer>
      <LeftContainer>
        <UserInfo>
          <UserAvatar photoURL={user?.photoURL} />
          <UserName>{user?.displayName}</UserName>
        </UserInfo>
        <AddListButton onClick={addList}>
          <AiOutlinePlus />
          Dodaj Listę
        </AddListButton>
      </LeftContainer>
      <RightContainer>
        <NightModeIcon />
        <FlagContainer>
          <ReactCountryFlag countryCode="PL" svg />
          <ReactCountryFlag countryCode="GB" svg />
        </FlagContainer>
        <LogOut onClick={handleLogOut}>
          <MdOutlineLogout />
          <LogOutText>Wyloguj się</LogOutText>
        </LogOut>
      </RightContainer>
    </NavBarContainer>
  );
};

export default NavBar;

NavBar.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

NavBar.defaultProps = {
  user: {},
};
