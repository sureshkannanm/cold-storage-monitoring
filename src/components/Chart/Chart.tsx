import './Chart.scss';
import ReactEcharts from 'echarts-for-react';
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
      left: '1%',
      right: '8%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Humidity',
        position: 'right',
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
        // max: 100,
        // min: 0,
        position: 'left',
        alignTicks: {
          show: true,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          show: true,
          formatter: '{value} C',
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
        yAxisIndex: 1,
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
      const updateOptions = (humidity: any, temp: any) => {
        optionChart.series[0].data = humidity;
        optionChart.series[1].data = temp;
        setOptions(optionChart);
      };
      updateOptions(humidity, temp);
    } else {
      console.error('Series not Availale');
    }
  }, [props.series]);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="card">
      {options ? <ReactEcharts option={options} /> : ''}
    </div>
  );
};

export default Chart;
