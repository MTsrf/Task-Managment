import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isAuthenticated = user?.isAuthenticated || false;
  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate replace to="/" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
