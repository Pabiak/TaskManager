import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { UserAuth } from './context/AuthContext';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ThemeProvider from './Theme';
import GlobalStyle from './GlobalStyles';
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import Spinner from './components/Spinner/spinner.component';

const App = () => {
    return (
        <AuthContextProvider>
            <AppContent />
        </AuthContextProvider>
    );
};

const AppContent = () => {
    const { user, loading } = UserAuth();

    return (
        <ThemeProvider>
            <GlobalStyle />
            {loading ? (
                <Spinner />
            ) : user ? (
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            ) : (
                <Routes>
                    <Route exact path='/login' element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </ThemeProvider>
    );
};

export default App;
