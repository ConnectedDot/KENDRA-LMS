import { Navigate, Route } from "react-router-dom";
import React, { lazy, useContext } from "react";
import { AuthContext } from "../context";
import Loader from "../components/Loader";

interface PrivateRouteProps {
  path: string;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role as string)) {
    return <Navigate to="/unauthorized" replace />;
  }

  const LazyComponent = lazy(() =>
    user.role === "Admin"
      ? import("../modules/Admin")
      : user.role === "Instructor"
      ? import("../modules/Instructor")
      : import("../modules//User")
  );

  return (
    <Route
      path={path}
      element={
        <React.Suspense fallback={<Loader />}>
          <LazyComponent />
        </React.Suspense>
      }
    />
  );
};

export default PrivateRoute;
