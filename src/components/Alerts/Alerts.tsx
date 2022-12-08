import './Alerts.scss';

type AlertProps = {
  alerts: any;
};
const Alerts: React.FC<AlertProps> = (props) => {
  return (
    <div className="card">
      {props.alerts.map((alert: any,i:any) => {
        return (
          <div className="Alert" key={i}>
            <div className='time' >{alert.timestamp.toUTCString()}</div>
            <div className='message'>{alert.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Alerts;
