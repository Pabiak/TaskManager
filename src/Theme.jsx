import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const theme = {
  breakpoints: {
    xs: '496px',
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1400px',
  },
  colors: {
    primary: "#2D6ED7",
    secondary: "#333B48",
    white: "#FFFFFF",
    black: "#071122",
    gray: "#b4b7bc",
    darkGray: "#333B48"
  },
  fontSizes: {
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    xl2: '2rem', // 32px
    xl3: '3rem', // 48px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontFamilies: {
    primary : "'Roboto', sans-serif",
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.any.isRequired
};

export default Theme;