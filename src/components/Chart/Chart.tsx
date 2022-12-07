import './Chart.scss';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
type ChartProps = {
  series: any;
};
const Chart: React.FC<ChartProps> = (props) => {
  const optionChart = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: props.series[0]?.assetId,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '10%',
      right: '8 %',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
        axisTick: {
            alignWithLabel: true
          },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Humidity',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: '{value} %',
        },
      },
      {
        type: 'value',
        name: 'Temperature',
        position: 'Right',
        alignTicks: true,
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: '{value} F',
        },
      },
    ],
    series: [
      {
        name: 'Humidity',
        type: 'line',
        data: [],
      },
      {
        name: 'Temperature',
        type: 'line',
        data: [],
      },
    ],
  };
  const [options, setOptions] = useState<any>(null);
  useEffect(() => {
    if (props.series) {
      const time = props.series.map((x: any) => x.timestamp);
      const humidity = props.series.map((x: any, i: number) => [
        time[i].getTime(),
        x.data.humidity,
      ]);
      const temp = props.series.map((x: any, i: number) => [
        time[i].getTime(),
        x.data.temp,
      ]);

      optionChart.series[0].data = humidity;
      optionChart.series[1].data = temp;
      setOptions(optionChart);
    } else {
      console.error('Series not Availale');
    }
  }, [props.series]);
  return (
    <div className="card">
      {options ? <ReactEcharts option={options} /> : ''}
    </div>
  );
};

export default Chart;
