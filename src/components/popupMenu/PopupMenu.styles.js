import styled from 'styled-components';
import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const PopupMenuContainer = styled.div`
    display: flex;
`;

export const StyledDropdownToggle = styled(DropdownToggle)`
    all: unset;
    color: ${({ theme }) => theme.colors.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: transparent;
    }
    &:focus {
        background-color: transparent;
    }

`;

export const StyledDropdownMenu = styled(DropdownMenu)`
    background-color: ${({ theme }) => theme.colors.gray};
`;

export const StyledDropdownItem = styled(DropdownItem)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
    color: ${({ theme }) => theme.colors.lightGray};
    &:hover {
        background-color: ${({ theme }) => theme.colors.hoverGray};
        color: white;
    }

    &:focus {
        background-color: ${({ theme }) => theme.colors.hoverGray};
        color: white;
    }
`;
