import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import decodeUserRole from "../decodeToken/decodeToken";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const [userRole, setUserRole] = useState<string | undefined>(undefined);
  const [isRoleChecked, setIsRoleChecked] = useState(false);

  const userData = localStorage.getItem("userData");
  const token = userData ? JSON.parse(userData).accessToken : undefined;

  useEffect(() => {
    const role = decodeUserRole(token);
    setUserRole(role);
    setIsRoleChecked(true);
  }, [token]);

  if (!isRoleChecked) {
    return null;
  }

  return allowedRoles.includes(userRole ?? "") ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
