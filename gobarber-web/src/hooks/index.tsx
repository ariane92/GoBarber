import React from 'react';

import { AuthContext, AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
