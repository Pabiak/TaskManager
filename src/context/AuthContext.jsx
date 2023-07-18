import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import auth from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [ user, setUser ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
    });
    return unsubscribe;
  }, []);

  const providerValue = useMemo(
    () => ({
      signInWithGoogle,
      logOut,
      user,
      loading,
    }),
    [ signInWithGoogle, logOut, user, loading ],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

AuthContextProvider.defaultProps = {
  children: null,
};