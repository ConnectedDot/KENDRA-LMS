import React, { lazy, Suspense } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Spin } from "antd";

const ChangePassword = lazy(() => import("../modules/Auth/ChangePassword"));
const VerifyEmail = lazy(() => import("../modules/Auth/VerifyEmail"));

const AuthActionRouter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  if (mode === "resetPassword") {
    return (
      <Suspense fallback={<Spin />}>
        <ChangePassword />
      </Suspense>
    );
  } else if (mode === "verifyEmail") {
    return (
      <Suspense fallback={<Spin />}>
        <VerifyEmail />
      </Suspense>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthActionRouter;
