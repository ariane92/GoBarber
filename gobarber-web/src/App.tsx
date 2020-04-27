import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import AppProviders from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProviders>
      <Routes />
    </AppProviders>
    <GlobalStyle />
  </BrowserRouter>
);

export default App;
