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
    primary: '#2D6ED7',
    secondary: '#6454de',
    white: '#FFFFFF',
    black: '#071122',
    red: '#e33030',
    yellow: '#f1c40f',
    green: '#2ecc71',
    done: '#952ed0',
    hoverGray: '#52575c',
    gray: '#333B48',
    lightGray: '#b4b7bc',
    darkGray: '#333B48',
  },
  fontSizes: {
    xs: '0.75rem', // 12px
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
    primary: "'Roboto', sans-serif",
  },

  borderRadius: '10px',
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default Theme;
