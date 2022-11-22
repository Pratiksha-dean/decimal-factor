import React,{useState} from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
import axios from "axios";
import Chart from "./Chart";
import Loaderspinner from "../loader";

export default function AssessProfitAndLoss(props) {
    const [arrowclassName5, setarrowclassName5] = useState('fa fa-chevron-right');
    const [periodStart, setPeriodStart] = useState('');
    const [periodLength, setPeriodLength] = useState(1);
    const [periodCompare, setPeriodCompare] = useState(3);
    const [ratioData,setRatioData] = useState('');
    const [statementData,setStatementData] = useState('');
    const [dataCategoreis, setDataCategoreis] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [showStatementRatios, setShowStatementRatios]= useState(false)
    const [statementRatiosLoading, setStatementRatiosLoading] = useState(false)


const handleClassClick = () => {
    const profitstatement = document.querySelectorAll("tr[class^='profitstatement-label-']");    
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


    const subprofitstatement = document.querySelectorAll("tr[class^='hide sub-profitstatement-label-']");    
    
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

    const subsubprofitstatement = document.querySelectorAll("tr[class^='hide sub-sub-profitstatement-label-']");    
    
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


    const profitratios = document.querySelectorAll("tr[class^='profitratios-label-']");    
      for (let i of profitratios) {
          i.addEventListener("click", (e) => {
                  let clname = e.currentTarget.className.replace(" padding-left-1", "");
                  Array.from(document.getElementsByClassName('sub-' + clname)).forEach(function(element) {
                      element.classList.toggle("hide");
                  });
          })
      }

}
  
   const getProfitLossData = async(plength,pCompare,pStart) => {
        
        if(plength && pCompare && pStart){
            console.log('test true', pStart)
            setShowStatementRatios(false)
            setStatementRatiosLoading(true)
            await axios.get(`${props.endUrl}/CODAT/access_profit_loss/${props.leadId}/${plength}/${pCompare}/${pStart}`)
            .then( res => {
                 
                    setStatementData(Parser(res.data.data.split("class=").join("className=")));
                    setRatioData(Parser(res.data.ratio.split("class=").join("className=")));
                    setDataCategoreis(res.data.date);
                    setDataSeries([{
                        'name': 'Income',
                        'data': res.data.income
                    },
                    {
                        'name': 'Expense',
                        'data': res.data.expense
                    },
                    {
                        'name': 'Gross Profit',
                        'data': res.data.gross_profit
                    }
                    ]);
                    const myTimeout = setTimeout(handleClassClick, 1000);
              
                setStatementRatiosLoading(false)
                setShowStatementRatios(true)                      
        }).catch(err => {
            console.log(err);
            setStatementRatiosLoading(false)
            setShowStatementRatios(false)  
        });
        }
        else{
            console.log('test false', pStart)
            setShowStatementRatios(false)
        }
       
   }

  

      return (
          <div className="chart-panel">
              <div className="col-md-12">
              <h3>Profit and Loss</h3>
              <div className="row">
              <div className="col-md-3">
                <div className=" col-for-logo">
                <img src={require("../../images/gbp.png")} alt="" className="logo-dashboard" />
              
                <h3><strong>GBP</strong>
                <span>Great British Pound</span></h3>
                </div></div>
                {
                    statementRatiosLoading && (
                        <div className="position-relative">
                            <Loaderspinner size="45px" />
                        </div>
                    )
                }
                <div className="col-md-3 ">
                <div className="box-shape">
                <label>Period Start</label>
                <input type="month" value={periodStart} className="period-start" onChange={(e)=>{
                        setPeriodStart(e.target.value);
                       getProfitLossData(periodLength, periodCompare, e.target.value); 
                }}/>
                </div></div>
                <div className="col-md-3 ">
                    <div className="box-shape">
                <label>Period Length</label>
                <select value={periodLength} onChange={(e)=>{
                        setPeriodLength(e.target.value);
                       getProfitLossData(e.target.value, periodCompare, periodStart); 
                }}>
                <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="4">4 Months</option>
                    <option value="5">5 Months</option>
                </select>
                </div></div>
                <div className="col-md-3 ">
                    <div class="box-shape">
                <label>Period to Compare</label>
                <input type="number" value={periodCompare} onChange={(e)=>{ 
                    setPeriodCompare(e.target.value); getProfitLossData(periodLength,e.target.value,periodStart); }} name="" className="period-compare" />
                </div></div>
                </div>
                

                    {
                        showStatementRatios && (
                            <>
                            <div className="chart-div">
                {statementData !== '' && <Chart categories={dataCategoreis} series={dataSeries} />}
                                 <div className="table-data-div">
                <div className="col s12"  id="">
                    <div className="">
                        <h3 className="groupbydebtor">Statement</h3>
                        <div className=" scroll-bar scroll-bar-2">
                        <table id="assess-profitloss-table" className="table table-striped table-bordered" cellspacing="0" width="100%" border="0">
                            {statementData}

                        </table>
                    </div></div>
                </div>
                </div>
                <div className="table-data-div">
                    <div className="col s12"  id="">
                        <div className="">
                            <h3 className="groupbydebtor">Ratios</h3>
                            <div className=" scroll-bar scroll-bar-2">
                            <table id="assess-profitloss-table" class="table table-striped table-bordered" cellspacing="0" width="100%" border="0">
                               {ratioData}

                            </table>
                        </div></div>
                    </div>
                    </div>
                    </div>
                            </>
                        )
                    }

             
             
        </div>
        </div>

    );
}