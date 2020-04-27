import React from 'react';
import SignIn from './pages/SignIn/index';
// import SignUp from './pages/SignUp/index';
import ToastContainer from './components/ToastContainer';
import GlobalStyle from './styles/global';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyle />
  </>
);

export default App;
