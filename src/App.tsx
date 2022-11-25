import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>
  );
};

export default App;
