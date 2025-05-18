// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { userData, loading } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (!userData) {

    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userData.role.toLowerCase() !== requiredRole.toLowerCase()) {
    
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
