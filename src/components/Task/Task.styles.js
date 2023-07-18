import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

export const TaskContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 12rem;
    height: fit-content;
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.gray};
`;

export const TaskTitle = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    color: ${({ theme }) => theme.colors.lightGray};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    align-self: flex-start;
    padding-left: .5rem;
`;

export const TaskUpperBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

export const MenuIcon = styled(BsThreeDots)`
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.lightGray};
    cursor: pointer;
`;
