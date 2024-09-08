// import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from '../utils';
// import { useContext, useMemo } from 'react';
// import { AuthContext } from '../context';
// import { Loader } from '../components';

// interface AuthGuardProps {
//   children: React.ReactNode;
//   allowedRoles?: string[];
//   loggedInUser?: string[];
// }

// const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
//   const { user } = useContext(AuthContext);

//   const loggedInUser = useMemo(() => {
//     return user;
//   }, [user]);

//   if (!isAuthenticated()) {
//     return <Navigate to={'/login'} replace />;
//   }

//   if (!loggedInUser) {
//     return <Loader />;
//   }

//   if (allowedRoles && loggedInUser?.role && !allowedRoles.includes(loggedInUser.role)) {
//     return <Navigate to="*" replace />;
//   }

//   return <>{children}</>;
// };

// export default AuthGuard;

import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getStoredUser } from '../storage';
import { useFullLogout } from '../context/hooks';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const user = getStoredUser();
  const navigate = useNavigate();
  const fullLogout = useFullLogout();

  const loggedInUser = useMemo(() => user, [user]);

  useEffect(() => {
    if (!loggedInUser) {
      (async () => {
        await fullLogout();
        navigate('/login', { replace: true });
      })();
    }
  }, [loggedInUser, navigate, fullLogout]);

  return <>{children}</>;
};

export default AuthGuard;
