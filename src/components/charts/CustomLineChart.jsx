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
import { useMemo } from 'react';

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
      text: 'overview',
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

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];





const CustomLineChart = (
  {
    sellingsData, purchaseData
  }
) => {
 
  const seriesSellings = useMemo(()=>{
  let dates = sellingsData?.length > 0 ?  Object.values(sellingsData?.reduce((r, o) => {
      const date = `${o.createdAt.substr(0,7)}-01`;
      r[date] ||= {[date]: []};
      r[date][date].push(o);
      return r;
    }, [])) : []

       const sellingsSeries = dates?.length > 0 ? dates?.map((d)=>{
      let result = d[Object.keys(d)[0]]?.reduce(function(sum, current) {
          return sum + current.price;
        }, 0);
        let final = {
          data:result,
          key:Object.keys(d)[0]
        }
        return final
      }) : []
      const sorted = sellingsSeries?.sort(function (a, b) {
        var dateA = new Date(a.key), dateB = new Date(b.key)
        return dateA - dateB
      });
      console.log(sorted)

      let series = [0,0,0,0,0,0,0,0,0,0,0,0]
      let month = (new Date()).getMonth()+1
      series =  series.splice(0, month);
      sorted.map((data)=>{
        let month = parseInt(data.key.slice(5,7))
        series[month] = data.data
      })
     return series
  },[sellingsData])

  const seriesPurchases = useMemo(()=>{
    let dates = purchaseData?.length > 0 ?  Object.values(purchaseData?.reduce((r, o) => {
        const date = `${o.createdAt.substr(0,7)}-01`;
        r[date] ||= {[date]: []};
        r[date][date].push(o);
        return r;
      }, [])) : []
  
         const purchasesSeries = dates?.length > 0 ? dates?.map((d)=>{
        let result = d[Object.keys(d)[0]]?.reduce(function(sum, current) {
            return sum + current.price;
          }, 0);
          let final = {
            data:result,
            key:Object.keys(d)[0]
          }
          return final
        }) : []
        const sorted = purchasesSeries?.sort(function (a, b) {
          var dateA = new Date(a.key), dateB = new Date(b.key)
          return dateA - dateB
        });
  
        let series = [0,0,0,0,0,0,0,0,0,0,0,0]
        let month = (new Date()).getMonth()+1
        series =  series.splice(0, month);
        sorted.map((data)=>{
          let month = parseInt(data.key.slice(5,7))
          series[month] = data.data
        })
       return series
    },[purchaseData])

  const props = {
    
  }

  if(isMobile){
    props.height = "300px";
    props.width = "250px";
  }

 const data = {
    labels,
    datasets: [
      {
        label: 'sellings',
        data: seriesSellings,
        borderColor: '#539165',
        backgroundColor: '#539165',
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'purchases',
        data: seriesPurchases,
        borderColor: '#ED7B7B',
        backgroundColor: '#ED7B7B',
        tension: 0.4,
        pointRadius: 0
      }
    ],
  };

  return <Line {...props}  options={options} data={data} />;
}

export default CustomLineChart;