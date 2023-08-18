import { ModalBody } from 'reactstrap';
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

export const StyledButton = styled.button`
    all: unset;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    cursor: pointer;
    background-color: ${({ priority, theme }) => {
    const colors = {
      high: theme.colors.red,
      medium: theme.colors.yellow,
      low: theme.colors.green,
    };
    return colors[priority];
  }};
`;
