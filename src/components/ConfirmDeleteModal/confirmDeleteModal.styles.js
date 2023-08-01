import { ModalBody } from 'reactstrap';
import styled from 'styled-components';

export const Title = styled.span`
    font-weight: bold;
`;

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
