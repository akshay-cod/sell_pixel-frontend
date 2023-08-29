import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { priceFormat } from '../../helpers/formatting';
import { isMobile } from 'react-device-detect';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
   responsive: true,
  scale:{
    ticks:{
   count:6
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Sellings over-view',
    },
    tooltip: {
      enabled: true, // Enable tooltips
      mode: 'index', // Display multiple tooltips when overlapping data points
      intersect: false, // Allow tooltips to appear even if not directly over data points
      callbacks: {
        label: function (context) {
          // Format the value as currency
          const value = context.parsed.y;
          return priceFormat(value);
        },
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'sellings',
      data: [1,33,44,555,666,777,777,77],
      borderColor: 'rgb(66, 184, 126)',
      backgroundColor: 'rgb(66, 184, 126)',
      tension: 0.4,
      pointRadius: 0
    },
    {
      label: 'purchases',
      data: [21,323,424,555,666,222,777,77],
      borderColor: 'rgb(193, 127, 209)',
      backgroundColor: 'rgb(193, 127, 209)',
      tension: 0.4,
      pointRadius: 0
    }
  ],
};



const CustomLineChart = () => {
 
  const props = {
    
  }

  if(isMobile){
    props.height = "300px";
    props.width = "250px";
  }

  return <Line {...props}  options={options} data={data} />;
}

export default CustomLineChart;