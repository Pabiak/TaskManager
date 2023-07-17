import React, { useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
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
    NightModeIcon
} from './NavBar.styles';

const NavBar = () => {
    const { user, logOut } = UserAuth();
    const handleLogOut = async () => {
        try{
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <NavBarContainer>
            <LeftContainer>
                <UserInfo>
                    <UserAvatar photoURL={user?.photoURL}/>
                    <UserName>{user?.displayName}</UserName>
                </UserInfo>
                <AddListButton>
                    <AiOutlinePlus />
                    Dodaj Listę
                </AddListButton>
            </LeftContainer>
            <RightContainer>
                <NightModeIcon />
                <FlagContainer> 
                    <ReactCountryFlag countryCode='PL' svg />
                    <ReactCountryFlag countryCode='GB' svg />
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
