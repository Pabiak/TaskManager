import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, UserAuth } from './context/authContext';

import ThemeProvider from './theme';
import GlobalStyle from './globalStyles';
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import Spinner from './components/Spinner/spinner.component';

import 'bootstrap/dist/css/bootstrap.min.css'; // !Needed for reactstrap

const App = () => (
  <AuthContextProvider>
    <AppContent />
  </AuthContextProvider>
);

const AppContent = () => {
  const { user, loading } = UserAuth();

  const renderRoutes = () => {
    if (loading) {
      return <Spinner />;
    }

    if (user) {
      return (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  };

  return (
    <ThemeProvider>
      <GlobalStyle />
      {renderRoutes()}
    </ThemeProvider>
  );
};

export default App;
