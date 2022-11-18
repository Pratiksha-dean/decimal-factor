import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";




export default function AssessCommerce(props) {
    

  const chartData = {
    chart: {
      type: "Line",
      id: "apexchart-example",
      foreColor: '#000'
      
    },
    xaxis: {
      categories: ['Dec 2021', 'Jan 2022', 'Feb 2022', 'March 2022']
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
        
        // colorStops: []
      }
    },
    
    series: [
        {
          name: "Revenue",
          data: [190, 220, 20, 260],
        },
       
        {
          name: "Revenue Growth", 
          data: [103, 605, 98, 83],
        },
      
      ],
      yaxis: [
        {
          
          title: {
            text: "Series A"
          },
        },
        {
          opposite: true,
          title: {
            text: "Series B"
          }
        }
      ],
  };
  
  const chartData2 = {
    chart: {
      type: "Line",
      id: "apexchart-example",
      foreColor: '#000'
    },
    xaxis: {
      categories: ['Existing customers','New customers', 'Total customers']
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
        // colorStops: []
      }
    },
   
    series: [
        {
          name: "Total order value",
          data: [201.45,175.02,244.4],
        },
       
        {
          name: "New Customers", 
          data: [20.7,38.75,95.1],
        }
      
      ]
  };

      return (
          <div className="chart-panel">
              <div className="col-md-12">
              <h3>Commerce</h3>
              <div className="row">
              <div className="col-md-3">
                <div className=" col-for-logo">
                <img src={require("../../images/gbp.png")} alt="" className="logo-dashboard" />
              
                <h3><strong>GBP</strong>
                <span>Great British Pound</span></h3>
                </div></div>
                <div className="col-md-3 source-sandbox">
                  <label>Source </label> <img src={require("../../images/CommerceSandbox_Square.png")} alt="" className="commerce-img" />
                  <label> Commerce Sandbox</label>
                </div>
                <div className="col-md-3">
                <div className="box-shape">
                <label>Start Month</label>
                <input type="Month" name="" className="period-start" />
                </div></div>
                <div className="col-md-3 ">
                <div className="box-shape">
                <label>End Month</label>
                <input type="Month" name="" className="period-start" />
                </div></div>
               
                </div>
                <div className="chart-div">
                  <h3>Sales</h3>
                  <div className="chart-second">
                <div className="row">
                  <div className="col-md-12">
              <div className="value-box">
              <label>Av. order value</label>
              <h2 id="refundval">£51.4</h2>
            </div>
            </div></div></div>
            <div className="chart-width">
              <ReactApexChart options={chartData} series={chartData.series} />
              </div>
              <div className="chart-second">
                <div className="row">
                  <div className="col-md-12">
                    <h3>Merchant Health</h3>
              <div className="value-box">
              <label>Refund rate</label>
              <h2 id="refundval">0.19%</h2>
            </div>
            <div className="value-box">
            <label>Customer retention</label>
            <h2 id="retentionval">56.25%</h2>
          </div>
            <div className="value-box">
              <label>Lifetime value</label>
              <h2 id="lifetimevlaue">£34.98</h2>
            </div>
              <div className="select-graph">
                <div className="box-shape">
              <label>Select Graph</label>
            <select id="selectaccessgraph">
              <option value="customer" selected="">New vs. existing customers</option>
                <option value="orders">Orders vs. refunds</option>
                
            </select>
            </div>
              </div>
              </div></div>
              <ReactApexChart options={chartData2} series={chartData2.series}  />
              </div>
              </div>
        </div>
        </div>

    );
}