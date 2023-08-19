import styled from 'styled-components';
import { BsPencilFill, BsFillTrashFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { Input } from 'reactstrap';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 16rem;
    height: fit-content;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.black};
`;
export const ListTitle = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.lightGray};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    padding-left: 0.5rem;
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ListUpperBar = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const MenuIconsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    padding: 0.3rem;
    border-radius: 2px;
    gap: 1rem;
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
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-top: 1rem;
    align-self: flex-start;
    min-width: 7rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const EditListField = styled(Input)`
    width: 170px;
    background-color: transparent;
    color: white;
    height: fit-content;
    resize: none;
    padding: 0 0 0 0.5rem;
    overflow: hidden;
    &:focus {
        background-color: transparent;
        color: white;
    }
`;

export const EditIconsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    font-size: 1.2rem;
    flex-shrink: 0;
`;

export const ConfirmIcon = styled(AiOutlineCheck)`
    color: green;
    cursor: pointer;
`;

export const CancelIcon = styled(AiOutlineClose)`
    margin-left: 0.8rem;
    color: red;
    cursor: pointer;
`;

export const IconBase = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.lightGray};
    cursor: pointer;
`;

export const DeleteIcon = styled(IconBase).attrs({ as: BsFillTrashFill })`
    &:hover {
        color: ${({ theme }) => theme.colors.white};
    }
`;
export const EditIcon = styled(IconBase).attrs({ as: BsPencilFill })`
    font-size: ${({ theme }) => theme.fontSizes.md};
    &:hover {
        color: white;
    }
`;

export const DragHandle = styled(IconBase).attrs({ as: BsFillGrid3X3GapFill })`
    align-self: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};

    &:focus {
        outline: none;
    }
`;
