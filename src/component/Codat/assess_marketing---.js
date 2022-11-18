import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
import ReactApexChart from "react-apexcharts";




export default function AssessMarketing(props) {
  
 
    const [openLabel4, setOpenLabel4] = React.useState(false);
    const [openLabel5, setOpenLabel5] = React.useState(false);
    const [arrowclassName4, setarrowclassName4] = React.useState('fa fa-chevron-right');
    const [arrowclassName5, setarrowclassName5] = React.useState('fa fa-chevron-right');
  
 

const handleOpenLabel4 = () => {
    setOpenLabel4(!openLabel4);
    let className = 'fa fa-chevron-right';
    if (!openLabel4) {
    className += 'fa fa-chevron-down';
    setarrowclassName4('fa fa-chevron-down')
    }
    else {
    setarrowclassName4 ('fa fa-chevron-right')
    }
                
    };
const handleOpenLabel5 = () => {
setOpenLabel5(!openLabel5);
let className = 'fa fa-chevron-right';
if (!openLabel5) {
className += 'fa fa-chevron-down ';
setarrowclassName5('fa fa-chevron-down')
}
else {
setarrowclassName5 ('fa fa-chevron-right')
}
};    

    
    

  const chartData = {
    chart: {
      type: "Line",
      id: "apexchart-example",
      foreColor: '#000',
      height: '300'
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
    legend: {
      
      height:50
      
    },
    series: [
        {
          name: "Marketing to Revenue",
          data: [190, 220, 20, 260],
        },
       
        {
          name: "Marketing to Expense", 
          data: [103, 605, 98, 83],
        },
      
      ]
  };
  

      return (
          <div className="chart-panel">
              <div className="col-md-12">
              <h3>Marketing</h3>
              <div className="row">
              <div className="col-md-3">
                <div className=" col-for-logo">
                <img src={require("../../images/gbp.png")} alt="" className="logo-dashboard" />
              
                <h3><strong>GBP</strong>
                <span>Great British Pound</span></h3>
                </div></div>
                
                <div className="col-md-3 ">
                <div className="box-shape">
                <label>Period Start</label>
                <input type="month" name="" className="period-start" />
                </div></div>
                <div className="col-md-3 ">
                    <div className="box-shape">
                <label>Period Length</label>
                <select>
                <option>1 Month</option>
                    <option>2 Months</option>
                    <option>3 Months</option>
                    <option>4 Months</option>
                    <option>5 Months</option>
                </select>
                </div></div>
                <div className="col-md-3 ">
                    <div class="box-shape">
                <label>Period to Compare</label>
                <input type="number" name="" className="period-compare" />
                </div></div>
               
                </div>
                <div className="chart-div">
              <ReactApexChart options={chartData} series={chartData.series} style={{'width':'100%'}} />
              
                <div className="table-data-div">
                    <div className="col s12"  id="">
                        <div className="">
                           
                            <table id="assess-profitloss-table" class="table table-striped table-bordered" cellspacing="0" width="100%" border="0">
                                <thead>
                                    <tr>
                                    <th><strong></strong></th>
                                    <th><strong>Jan 2021 - Feb 2022</strong></th>
                                    <th><strong>Jan 2021 - Feb 2022</strong></th>
                                    <th><strong>Jan 2021 - Feb 2022</strong></th>
                                    <th><strong>Jan 2021 - Feb 2022</strong></th>
                                    <th><strong>Jan 2021 - Feb 2022</strong></th>
                                    
                                </tr>
                                </thead>
                                <tbody>
                                    <tr className="profitratios-label-1">
                                        <td>
                                        <i className={arrowclassName4}  onClick={handleOpenLabel4}></i>
                                        <strong>Marketing to revenue</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>
                                    {openLabel4 ? (<tr className="profitratios-label-2">
                                        <td><strong className="padding-left-1">Operating income</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>
                                    ) : null }
                                    {openLabel4 ? ( <tr className="profitratios-label-3">
                                        <td><strong className="padding-left-1">Marketing expense</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>) : null }

                                    <tr className="profitratios-label-4">
                                        <td>
                                        <i className={arrowclassName5}  onClick={handleOpenLabel5}></i>
                                        <strong>Marketing to expense</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>
                                    {openLabel5 ? (<tr className="profitratios-label-5">
                                        <td ><strong  className="padding-left-1">Operating expense</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>) : null }
                                    {openLabel5 ? (<tr className="profitratios-label-6">
                                        <td><strong className="padding-left-1">Marketing expense</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>) : null }
                                    
                                    
                                </tbody>

                            </table>
                        </div>
                    </div>
                    </div>
              </div>
        </div>
        </div>

    );
}