import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMe } from '@entities/auth/model/hooks';
import { Loader } from '@shared/ui/Loader';

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isError, isLoading, error } = useMe();

  if (isLoading) return <Loader />;

  if (isError) {
    console.warn('Access denied:', error);
    return <Navigate to="/login" replace />;
  }

  return children;
};
