import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useValidateToken } from '../api/useAuth';
import AppLayout from '../components/appLayout/AppLayout';
import Spinner from '../components/spinner/Spinner';

function ProtectedRoute() {
  const { key } = useLocation();
  const { isLoading } = useValidateToken();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated'),
  );

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, [key]);

  return (
    <>
      {isLoading ? (
        <Spinner height='40rem' />
      ) : isAuthenticated ? (
        <AppLayout />
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}

export default ProtectedRoute;
