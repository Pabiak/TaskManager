import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

const addAlphaChannel = (color, alpha) => {
  const rgb = color
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};

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
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => addAlphaChannel(theme.colors.gray, 0.7)};
    }
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
