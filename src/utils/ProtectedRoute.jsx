import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../components/appLayout/AppLayout';

function ProtectedRoute() {
  const [isAuthenticated] = useState(() => {
    const value = localStorage.getItem('isAuthenticated');
    return value === 'true';
  });

  return <>{isAuthenticated ? <AppLayout /> : <Navigate to='/login' />}</>;
}

export default ProtectedRoute;
