import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: linear-gradient(90deg, rgba(7,17,34,1) 0%, rgba(45,116,215,1) 0%, rgba(45,168,215,1) 30%, rgba(66,148,194,1) 58%, rgba(45,110,215,1) 73%, rgba(7,17,34,1) 100%);
  }
`;

export default GlobalStyle;
