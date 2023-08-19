import { ModalBody, Input } from 'reactstrap';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
`;

export const StyledModalBody = styled(ModalBody)`
    padding: 2rem 2rem 1rem 2rem;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
`;

export const CalendarContainer = styled.div`
    margin-top: 1.5rem;
`;

export const DateInput = styled(Input)`
    width: 100%;
    background-color: transparent;
    color: white;
    overflow: hidden;

    &&::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }

    &:focus {
        background-color: transparent;
        color: white;
    }
`;
