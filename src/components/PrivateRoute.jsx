import { Navigate, Outlet } from 'react-router-dom';

// Check if the user has a valid JWT token
export const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Assuming you're storing the JWT token in localStorage

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If there's a valid token, render the child routes
  return <Outlet />;
};
