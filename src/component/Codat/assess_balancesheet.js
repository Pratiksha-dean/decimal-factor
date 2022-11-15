import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";




export default function AssessBalanceSheet(props) {

  const [openLabel1, setOpenLabel1] = React.useState(false);
    const [openLabel2, setOpenLabel2] = React.useState(false);
    const [openLabel3, setOpenLabel3] = React.useState(false);
    const [openLabel4, setOpenLabel4] = React.useState(false);
    const [openLabel5, setOpenLabel5] = React.useState(false);
    const [arrowclassName, setarrowclassName] = React.useState('fa fa-chevron-right');
    const [arrowclassName2, setarrowclassName2] = React.useState('fa fa-chevron-right padding-left-1');
    const [arrowclassName3, setarrowclassName3] = React.useState('fa fa-chevron-right padding-left-2');
    const [arrowclassName4, setarrowclassName4] = React.useState('fa fa-chevron-right');
    const [arrowclassName5, setarrowclassName5] = React.useState('fa fa-chevron-right');
  
  const handleOpenLabel1 = () => {
    setOpenLabel1(!openLabel1);
    let className = 'fa fa-chevron-right';
    if (!openLabel1) {
    className += 'fa fa-chevron-down';
    setarrowclassName('fa fa-chevron-down')
    }
    else {
    setarrowclassName ('fa fa-chevron-right')
    }
    
    };
    
const handleOpenLabel2 = () => {
setOpenLabel2(!openLabel2);
let className = 'fa fa-chevron-right padding-left-1';
if (!openLabel2) {
className += 'fa fa-chevron-down padding-left-1';
setarrowclassName2('fa fa-chevron-down padding-left-1')
}
else {
setarrowclassName2 ('fa fa-chevron-right padding-left-1')
}
        
};
const handleOpenLabel3 = () => {
setOpenLabel3(!openLabel3);
let className = 'fa fa-chevron-right padding-left-2';
if (!openLabel3) {
className += 'fa fa-chevron-down padding-left-2';
setarrowclassName3('fa fa-chevron-down padding-left-2')
}
else {
setarrowclassName3 ('fa fa-chevron-right padding-left-2')
}
            
};

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
    legend: {
      
      height:50
      
    },
    series: [
        {
          name: "Asset",
          data: [190, 220, 20, 260],
        },
       
        {
          name: "Liability", 
          data: [103, 605, 98, 83],
        },
        {
            name: "Equity",
            data: [203, 305, 198, 283], 
          },
      ]
  };

      return (
          <div className="chart-panel">
              <div className="col-md-12">
              <h3>Balance Sheet</h3>
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
                <input type="date" name="" className="period-start" />
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
                        <h3 className="groupbydebtor">Statement</h3>
                        <table id="assess-profitloss-table" className="table table-striped table-bordered" cellspacing="0" width="100%" border="0">
                            <thead>
                                <tr>
                                <th><strong><input type="checkbox" class="checkbox-1" /></strong></th>
                                <th><strong>Jan 2021 - Feb 2022</strong></th>
                                <th><strong>Jan 2021 - Feb 2022</strong></th>
                                <th><strong>Jan 2021 - Feb 2022</strong></th>
                                <th><strong>Jan 2021 - Feb 2022</strong></th>
                                <th><strong>Jan 2021 - Feb 2022</strong></th>
                                
                            </tr>
                            </thead>
                            <tbody>
                                <tr className="profitstatement-label-1">
                                    <td>
                                    <i className={arrowclassName}  onClick={handleOpenLabel1}></i>
                                    <input type="checkbox" class="checkbox-2" /> <strong>Income</strong></td>
                                    <td>117,568.27</td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                
                                </tr>
                                {openLabel1 ? (
                                <tr className="profitstatement-label-2">
                                    <td>
                                        <i  className={arrowclassName2}  onClick={handleOpenLabel2}></i>
                                    <input type="checkbox" class="checkbox-2" /> <strong>Operating</strong></td>
                                    <td>117,568.27</td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                
                                </tr>
                                ) : null }
                                {openLabel2 ? ( <tr className="profitstatement-label-3">
                                    <td>
                                        <i  className={arrowclassName3}  onClick={handleOpenLabel3}></i>
                                    <input type="checkbox" class="checkbox-2" /> <strong>Other Operating Income</strong></td>
                                    <td>117,568.27</td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                
                                </tr> ) : null }
                                
                                {openLabel3 ? ( <tr className="profitstatement-label-4">
                                    <td ><input type="checkbox" class="checkbox-2 margin-left-3 " /> <strong>Sales</strong></td>
                                    <td>117,568.27</td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                
                                </tr>) : null }
                                {openLabel3 ? (<tr className="profitstatement-label-5">
                                    <td ><input type="checkbox" class="checkbox-2 margin-left-3" /> <strong>Other Revenue</strong></td>
                                    <td>117,568.27</td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-up"></i></td>
                                    <td>117,568.27 <i class="fa fa-caret-down"></i></td>
                                
                                </tr> ) : null }
                                
                                
                            </tbody>

                        </table>
                    </div>
                </div>
                </div>
                <div className="table-data-div">
                    <div className="col s12"  id="">
                        <div className="">
                            <h3 className="groupbydebtor">Ratios</h3>
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
                                        <strong>Debt Service Coverage Ratio</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>
                                    {openLabel4 ? (<tr className="profitratios-label-2">
                                        <td><strong className="padding-left-1">Net Operating Income</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>
                                    ) : null }
                                    {openLabel4 ? ( <tr className="profitratios-label-3">
                                        <td><strong className="padding-left-1">Total Debt Service</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>) : null }

                                    <tr className="profitratios-label-4">
                                        <td>
                                        <i className={arrowclassName5}  onClick={handleOpenLabel5}></i>
                                        <strong>Debt Service Coverage Ratio</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>
                                    {openLabel5 ? (<tr className="profitratios-label-5">
                                        <td ><strong  className="padding-left-1">Net Operating Income</strong></td>
                                        <td>117,568.27</td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                        <td>117,568.27 </td>
                                    
                                    </tr>) : null }
                                    {openLabel5 ? (<tr className="profitratios-label-6">
                                        <td><strong className="padding-left-1">Total Debt Service</strong></td>
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