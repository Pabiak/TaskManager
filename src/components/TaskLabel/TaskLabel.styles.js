import styled from 'styled-components';

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.3rem;
    width: fit-content;
    height: fit-content;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ priority, theme }) => {
    const colors = {
      high: theme.colors.red,
      medium: theme.colors.yellow,
      low: theme.colors.green,
    };
    return colors[priority];
  }};
    border-radius: 6px;
    padding: 0 8px;
    margin-top: 0.5rem;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    z-index: 1999;
`;

export default LabelContainer;
