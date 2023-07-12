import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    padding: 1rem;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.black};
`;
export const ListTitle = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.lightGray};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    padding-left: .5rem;
`;

export const ListUpperBar = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const MenuIcon = styled(BsThreeDots)`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.lightGray};
    cursor: pointer;
`;

export const MenuIconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    padding: 0.3rem;
    border-radius: 2px;
`;

export const TaskContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const AddTaskButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    font-weight: ${({ theme }) => theme.fontWeights.light};
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: .5rem 1rem .5rem 0.5rem;
    border-radius: 12px;
    margin-top: 1rem;
    align-self: flex-start;
    transition: all .2s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;
