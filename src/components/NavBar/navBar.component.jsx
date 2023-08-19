import React from 'react';
import PropTypes from 'prop-types';

import {
  collection, getDocs, addDoc,
} from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import ReactCountryFlag from 'react-country-flag';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { database } from '../../firebase';
import { UserAuth } from '../../context/authContext';

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
} from './navBar.styles';

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const { t, i18n } = useTranslation();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const addList = async () => {
    const listCollection = collection(database, `lists-${user?.uid}`);
    const snapshot = await getDocs(listCollection);
    const currentCount = snapshot.size;
    addDoc(listCollection, {
      title: t('navBar.initialListTitle'),
      tasks: [],
      order: currentCount + 1,
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
          {t('navBar.addList')}
        </AddListButton>
      </LeftContainer>
      <RightContainer>
        <FlagContainer>
          {i18n.language === 'en' ? <ReactCountryFlag countryCode="PL" svg onClick={() => i18n.changeLanguage('pl')} />
            : <ReactCountryFlag countryCode="GB" svg onClick={() => i18n.changeLanguage('en')} />}
        </FlagContainer>
        <LogOut onClick={handleLogOut}>
          <MdOutlineLogout />
          <LogOutText>{t('navBar.logout')}</LogOutText>
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
