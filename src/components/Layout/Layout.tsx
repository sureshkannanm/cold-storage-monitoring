import { Route, Routes } from 'react-router-dom';

import './Layout.scss';

import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import Alerts from '../Alerts/Alerts';

const Layout = () => {
  return (
    <div className="Layout">
      <Header></Header>
      <div className="Layout-content">
        <Routes>
          <Route path="/" element={Dashboard()} />
          <Route path="/alerts" element={Alerts()} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
