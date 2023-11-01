import Header from '@/components/header';
import Layout from '@/components/layout';
import useDarkMode from '@/hooks/use-darkmode';
import Login from '@/pages/login';
import Overview from '@/pages/overview';
import Ticket from '@/pages/ticket';
import { useDarkModeStore } from '@/store/useDarkModeStore';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoute from './PublicRoutes';

const AppRoutes = () => {
  const { darkMode } = useDarkModeStore();
  const { toggleDarkMode } = useDarkMode();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Header mode={darkMode!} toggle={toggleDarkMode} />}
          >
            <Route path="ticket" element={<Ticket />} />
            <Route path="/" element={<Overview />} />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
