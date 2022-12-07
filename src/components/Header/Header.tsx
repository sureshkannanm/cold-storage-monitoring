import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();

  const handleAlertPageNavigation = () => {
    navigate('/alerts');
  };

  const handleHomePageNavigation = (e: any) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="Header">
      <div className="AppDetail" onClick={handleHomePageNavigation}>
        <div className="logo">
          <div className="logo-parent">
            {' '}
            <span className="material-symbols-outlined">warehouse</span>
          </div>
          <div className="logo-child">
            {' '}
            <span className="material-symbols-outlined">
              humidity_percentage
            </span>
            <span className="material-symbols-outlined">device_thermostat</span>
          </div>
        </div>
        <div className="App-Name">Cold storage monitoring</div>
      </div>
      <div className="Action">
        <button className="AlertButton" onClick={handleAlertPageNavigation}>
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <span className="AlertWarning"></span>
      </div>
    </div>
  );
};

export default Header;
