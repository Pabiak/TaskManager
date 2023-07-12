import styled from 'styled-components';
import { AddTaskButton } from '../List/List.styles';
import { BsFillMoonFill } from 'react-icons/bs';

export const NavBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
`;

export const UserAvatar = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const UserName = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.lightGray};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    padding-left: 0.5rem;
`;

export const AddListButton = styled(AddTaskButton)`
    background-color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
`;

export const LogOut = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    cursor: pointer;
    padding-right: 1rem;
`;

export const LogOutText = styled.span`
    padding-left: 0.5rem;
`;

export const FlagContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    cursor: pointer;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    margin: 0;
    gap: 1rem;
`;

export const NightModeIcon = styled(BsFillMoonFill)`
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
`;
