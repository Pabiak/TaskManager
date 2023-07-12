import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';

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
    return (
        <NavBarContainer>
            <LeftContainer>
                <UserInfo>
                    <UserAvatar />
                    <UserName>John Doe</UserName>
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
                <LogOut>
                    <MdOutlineLogout />
                    <LogOutText>Wyloguj się</LogOutText>
                </LogOut>
            </RightContainer>
        </NavBarContainer>
    );
};

export default NavBar;
