import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
