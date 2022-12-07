import './Dashboard.scss';
import ReactEcharts from "echarts-for-react"; 
import * as echarts from 'echarts'
import Chart from '../Chart/Chart';
import { useEffect } from 'react';
type DashboardProps = {
  timeSeries: any[];
};
const Dashboard:React.FC<DashboardProps>  = (props) => {

  useEffect(()=>{
    console.debug('Chnage in props.timeSeries')
  },[props.timeSeries])
  return (
    <div className="content">
      {
          props.timeSeries.map((series,i) => {
            if(series[0]?.assetId)
              return <Chart series={series} key={i}/>
          })
      }
    </div>
  );
};

export default Dashboard;
