import React,{useState} from "react";
import axios from "axios";
import Parser from 'html-react-parser';
import Chart from "./Chart";
import Loaderspinner from "../loader";




export default function AssessMarketing(props) {
    const [arrowclassName4, setarrowclassName4] = useState('fa fa-chevron-right');
    const [arrowclassName5, setarrowclassName5] = useState('fa fa-chevron-right');

    const [periodStart,setPeriodStart] = useState('');
    const [periodLength,setPeriodLength] = useState(1);
    const [periodCompare,setPeriodCompare] = useState(3);
    const [marketingData,setMarketingData] = useState('');
    const [dataCategoreis, setDataCategoreis] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [showMarketing, setShowMarketing]= useState(false)
    const [marketingLoading, setMarketingLoading] = useState(false)


    const handleClassClick = () => {
      const profitstatement = document.querySelectorAll("tr[class^='marketing-label-']");
      for (let i of profitstatement) {
          i.addEventListener("click", (e) => {
                  let clname = e.currentTarget.className.replace(" padding-left-1", "");
                  Array.from(document.getElementsByClassName(clname+'-sub')).forEach(function(element) {
                      element.classList.toggle("hide");
                  });
          })
      }
    }
    const getApiData = async (start, leng, compa) => {

      if(start!=='' && leng!=='' && compa!=''){
        setShowMarketing(false)
        setMarketingLoading(true)
        await axios.get(`${props.endUrl}/CODAT/assess_marketing/${props.leadId}/${leng}/${compa}/${start}`)
        .then(res => {
          setMarketingData(Parser(res.data.data.split("class=").join("className=")));
          setDataCategoreis(res.data.date);
          setDataSeries([{
            'name': 'Marketing to Revenue',
            'data': res.data.m_t_r
          },
          {
            'name': 'Marketing to Expense',
            'data': res.data.m_t_e
          }
          ]);
          setMarketingLoading(false)
          setShowMarketing(true)
          const myTimeout = setTimeout(handleClassClick, 1000);
        }).catch(err => {
          setMarketingLoading(false)
          setShowMarketing(false)
          const myTimeout = setTimeout(handleClassClick, 1000);
        })

      }
      else{
        setShowMarketing(false)
    }
    }

      return (
        <div className="chart-panel">
          <div className="col-md-12">
            <h3>Marketing</h3>
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
              {marketingLoading && (
                <div className="position-relative">
                  <Loaderspinner size="45px" />
                </div>
              )}
              <div className="col-md-3 ">
                <div className="box-shape">
                  <label>Period Start</label>
                  <input
                    type="month"
                    name=""
                    className="period-start"
                    value={periodStart}
                    onChange={(e) => {
                      setPeriodStart(e.target.value);
                      getApiData(e.target.value, periodLength, periodCompare);
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
                      getApiData(periodStart, e.target.value, periodCompare);
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
                    name=""
                    className="period-compare"
                    value={periodCompare}
                    onChange={(e) => {
                      setPeriodCompare(e.target.value);
                      getApiData(periodStart, periodLength, e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {showMarketing && (
              <>
                <div className="chart-div">
                  {marketingData !== "" && (
                    <Chart categories={dataCategoreis} series={dataSeries} />
                  )}

                  <div className="table-data-div">
                    <div className="col s12" id="">
                      <div className="">
                        <h3 className="groupbydebtor">Marketing</h3>
                        <div className=" scroll-bar scroll-bar-2">
                          <table
                            id="assess-profitloss-table"
                            className="table table-striped table-bordered"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            {marketingData}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
}