import React from "react";
import ReactApexChart from "react-apexcharts";

export default function Chart(props) {
   
  const chartData = {
    chart: {
      type: "Line",
      id: props.id,
      foreColor: '#000'
    },
    xaxis: {
      categories: props.categories
    },
    
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100]
        }
    },
    legend: {
      
      height:50
      
    },
    series: props.series
  };
  
    return (
              <ReactApexChart options={chartData} series={chartData.series} style={{'width':'100%'}} />
    );
}