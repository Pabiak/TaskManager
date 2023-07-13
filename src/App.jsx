import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ThemeProvider  from './Theme';
import GlobalStyle from './GlobalStyles';
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';

const App = () => {
    return (
        <ThemeProvider>
            <GlobalStyle />
             <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
