import React,{useState} from "react";

import Parser from 'html-react-parser';
import axios from "axios";
import Chart from "./Chart";
import Loaderspinner from "../loader";

export default function AssessBalanceSheet(props) {

    const [arrowclassName5, setarrowclassName5] = useState('fa fa-chevron-right');
    const [periodStart, setPeriodStart] = useState('');
    const [periodLength, setPeriodLength] = useState(1);
    const [periodCompare, setPeriodCompare] = useState(3);
    const [ratioData,setRatioData] = useState('');
    const[statementData,setStatementData] = useState('');
    const [dataCategoreis, setDataCategoreis] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [showStatementRatios, setShowStatementRatios]= useState(false);
    const [statementRatiosLoading, setStatementRatiosLoading] = useState(false);
    let resourceData = [];

  const handleSelectAllCheckbox = () => {
    document.getElementById("selectAllBalance").checked = false;
    Array.from(
      document.getElementsByClassName("chkbalance")
    ).forEach(function (element) {
      element.checked = false;
    });
    setDataSeries([]);
  }

  const generateChart = () => {
    const seriesData = [];
    Array.from(document.getElementsByClassName("chkbalance")).forEach(
      function (element) {
        if(element.checked === true){
          let name = element.alt.replace('_',' ');
          seriesData.push({
            name: name,
            data: resourceData[element.alt],
          })

        }
    });
    setDataSeries(seriesData);

  }

const handleClassClick = () => {
    document.getElementById("selectAllBalance").addEventListener("click", handleSelectAllCheckbox);
    const chkbalance = document.querySelectorAll(
      "input[class^='chkbalance']"
    );

    for (let i of chkbalance) {
      i.addEventListener("click", (e) => {
        generateChart();
      })
    }


    const profitstatement = document.querySelectorAll("tr[class^='balancestatement-label-']");
    for (let i of profitstatement) {
        i.addEventListener("click", (e) => {
            if(e.target.type !='checkbox'){
                let clname = e.currentTarget.className.replace(" padding-left-1", "");
                Array.from(document.getElementsByClassName('sub-' + clname)).forEach(function(element) {
                    element.classList.toggle("hide");
                });

                Array.from(document.getElementsByClassName('sub-sub-' + clname)).forEach(function(element) {
                    element.classList.add("hide");
                });

                Array.from(document.getElementsByClassName('sub-sub-sub-' + clname)).forEach(function(element) {
                    element.classList.add("hide");
                });
            }
        })
    }

    const subprofitstatement = document.querySelectorAll("tr[class^='sub-balancestatement-label-']");
    for (let i of subprofitstatement) {
        i.addEventListener("click", (e) => {
            if(e.target.type !='checkbox'){
                let clname = e.currentTarget.className.replace(" padding-left-1", "");
                Array.from(document.getElementsByClassName('sub-' + clname)).forEach(function(element) {
                    element.classList.toggle("hide");
                });

                Array.from(document.getElementsByClassName('sub-sub-' + clname)).forEach(function(element) {
                    element.classList.add("hide");
                });

                Array.from(document.getElementsByClassName('sub-sub-sub-' + clname)).forEach(function(element) {
                    element.classList.add("hide");
                });
            }
        })
    }

    const subsubprofitstatement = document.querySelectorAll("tr[class^='sub-sub-balancestatement-label-']");

    for (let i of subsubprofitstatement) {
        i.addEventListener("click", (e) => {
            if(e.target.type !='checkbox'){
                let clname = e.currentTarget.className.replace(" padding-left-1", "");
                Array.from(document.getElementsByClassName('sub-' + clname)).forEach(function(element) {
                    element.classList.toggle("hide");
                });
                Array.from(document.getElementsByClassName('sub-sub-' + clname)).forEach(function(element) {
                    element.classList.add("hide");
                });
                Array.from(document.getElementsByClassName('sub-sub-sub-' + clname)).forEach(function(element) {
                    element.classList.add("hide");
                });

            }
        })
    }

    const profitratios = document.querySelectorAll("tr[class^='balanceratios-label-']");
      for (let i of profitratios) {
          i.addEventListener("click", (e) => {
                  let clname = e.currentTarget.className.replace(" padding-left-1", "");
                  Array.from(document.getElementsByClassName('sub-' + clname)).forEach(function(element) {
                      element.classList.toggle("hide");
                  });
          })
      }

}
   const getBalanceSheetData = async(plength,pCompare,pStart) => {

    if(plength && pCompare && pStart){
        setShowStatementRatios(false)
        setStatementRatiosLoading(true)

        await axios.get(`${props.endUrl}/CODAT/assess_balance_sheet/${props.leadId}/${plength}/${pCompare}/${pStart}`)
        .then( res => {
                setStatementData(Parser(res.data.data.split("class=").join("className=")));
                setRatioData(Parser(res.data.ratio.split("class=").join("className=")));
                resourceData = res.data;
                setDataCategoreis(res.data.date);
                setDataSeries([{
                    'name': 'Asset',
                    'data': res.data.asset
                },
                {
                    'name': 'Liability',
                    'data': res.data.liability
                },
                {
                    'name': 'Equity',
                    'data': res.data.equity
                }
                ]);
                const myTimeout = setTimeout(handleClassClick, 1000);
                setStatementRatiosLoading(false)
                setShowStatementRatios(true)
        }).catch(err => {
            setStatementRatiosLoading(false)
            setShowStatementRatios(false)
        });
    }
    else{
        setShowStatementRatios(false)
    }




   }


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
                  <img
                    src={require("../../images/gbp.png")}
                    alt=""
                    className="logo-dashboard"
                  />

                  <h3>
                    <strong>GBP</strong>
                    <span>Great British Pound</span>
                  </h3>
                </div>
              </div>
              {statementRatiosLoading && (
                <div className="position-relative">
                  <Loaderspinner size="45px" />
                </div>
              )}
              <div className="col-md-3 ">
                <div className="box-shape">
                  <label>Period Start</label>
                  <input
                    type="month"
                    value={periodStart}
                    className="period-start"
                    onChange={(e) => {
                      setPeriodStart(e.target.value);
                      getBalanceSheetData(
                        periodLength,
                        periodCompare,
                        e.target.value
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="box-shape">
                  <label>Period Length</label>
                  <select
                    value={periodLength}
                    onChange={(e) => {
                      setPeriodLength(e.target.value);
                      getBalanceSheetData(
                        e.target.value,
                        periodCompare,
                        periodStart
                      );
                    }}
                  >
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="4">4 Months</option>
                    <option value="5">5 Months</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="box-shape">
                  <label>Period to Compare</label>
                  <input
                    type="number"
                    className="period-compare"
                    value={periodCompare}
                    onChange={(e) => {
                      setPeriodCompare(e.target.value);
                      getBalanceSheetData(
                        periodLength,
                        e.target.value,
                        periodStart
                      );
                    }}
                    name=""
                  />
                </div>
              </div>
            </div>
            {showStatementRatios && (
              <div className="chart-div">
                {statementData !== "" && (
                  <Chart categories={dataCategoreis} series={dataSeries} />
                )}

                <>
                  <div className="table-data-div">
                    <div className="col s12" id="">
                      <div className="">
                        <h3 className="groupbydebtor">Statement</h3>
                        <div className=" scroll-bar scroll-bar-2">
                          <table
                            id="assess-profitloss-table"
                            className="table table-striped table-bordered"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            {statementData}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-data-div">
                    <div className="col s12" id="">
                      <div className="">
                        <h3 className="groupbydebtor">Ratios</h3>
                        <div className=" scroll-bar scroll-bar-2">
                          <table
                            id="assess-profitloss-table"
                            className="table table-striped table-bordered"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            {ratioData}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
      );
}