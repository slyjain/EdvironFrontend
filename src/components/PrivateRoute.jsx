import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If there's a valid token, render the child routes
  return <Outlet />;
};
