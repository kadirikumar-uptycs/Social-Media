import { CssBaseline, ThemeProvider } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { darkTheme, lightTheme } from './theme';
import { checkAuth } from './features/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import CyberbullyingGuidelines from './pages/CyberbullyingGuidelines';
import { Navbar, Loading } from './components';

const App = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const AuthWrapper = () => {
  const { status, user } = useSelector((state) => state.auth);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/guidelines" element={<CyberbullyingGuidelines />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </AnimatePresence>
  );
};

const ProtectedLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user && status === 'succeeded') {
    console.log(user);
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;