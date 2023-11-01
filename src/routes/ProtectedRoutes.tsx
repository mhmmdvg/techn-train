import { JWTParse, UserType } from '@/types/user-type';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const getUser = localStorage.getItem('user');
  let token: string;
  let user: UserType;

  if (typeof getUser === 'string') {
    user = JSON.parse(getUser);
    token = user.token;
  }

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const useAuth = () => {
    if (token) {
      const decodeJwt = parseJwt(token);
      const userParse: JWTParse = parseJwt(token);
      localStorage.setItem('user-parse', JSON.stringify(userParse));

      if (decodeJwt?.exp * 1000 < Date.now()) {
        localStorage.removeItem('user');
        return window.location.reload();
      } else {
        return true;
      }
    }

    return false;
  };

  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoutes;
