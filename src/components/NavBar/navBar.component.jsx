import React from 'react';
import PropTypes from 'prop-types';

import { collection, addDoc } from 'firebase/firestore';
import ReactCountryFlag from 'react-country-flag';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
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
  NightModeIcon,
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

  const addList = () => {
    const listCollection = collection(database, `lists-${user?.uid}`);
    addDoc(listCollection, {
      title: t('navBar.initialListTitle'),
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
          {t('navBar.addList')}
        </AddListButton>
      </LeftContainer>
      <RightContainer>
        {/* <NightModeIcon /> */}
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
