import React, { useEffect, useState } from "react";
import axios from "axios";

import Parser from 'html-react-parser';
export default function ProfitLoss(props) {
    const [yearList, setYearList] = useState([]);
    const [searchYear, setSearchYear] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchIntervals, setSearchIntervals] = useState('');
    const [resultData,setResultData]=useState('');       

    useEffect(()=>{
        const LoadMonths = async(finalUrl) =>{
            const response = await axios.get(finalUrl);
            const monthdata = Parser(response.data);
            const results =[]
            monthdata.forEach((e)=>{
                results.push({
                    key:e.props.children,
                    value:e.props.defaultValue?e.props.defaultValue:'',
                });
                
            })
           setYearList(results);
        }
        const finalUrl = `${props.endUrl}/CODAT/${props.leadId}/Profit_lossMonths`;
        
        LoadMonths(finalUrl);
    }, [props]);

    const generateData = async () => {
        if(searchIntervals !=='' && searchMonth !=='' && searchYear !==''){
            const finalUrl = `${props.endUrl}/CODAT/Profit_Loss/${props.leadId}/${searchIntervals}/${searchMonth}/${searchYear}`;
            const response = await axios.get(finalUrl);
            setResultData(Parser(response.data));
        } else {
            alert('Please fill all the required fill');
        }        
    }
    
    
    
        
        
      return (
        <div className="codatcontainer"> 
            <div className="col-md-12"><h3>Profit & Loss <br /><span>Currency GBP</span></h3></div>
            <div className="row">
                <div className="col-md-2">

                    <select className="form-control calender-icon-month startMonthbs checkvalidation" id="bsmonth"
                    onChange={(e)=>setSearchYear(e.target.value)}
                    >
                        {yearList.map((item,i)=>{
                               return <option value={item.value} key={item.value}>{item.key}</option> 
                        })}
                    </select>
                </div>   
                <div className="col-md-2">
                    <select className="form-control calender-icon checkvalidation" id="bsperiodLengthbs"
                    onChange={(e)=>setSearchIntervals(e.target.value)}
                    >
                        <option>Select Intervals</option>
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="9">9 Months</option>
                        <option value="12">12 Months</option>
                            
                    </select>
                </div>   
                <div className="col-md-2">
                    <input type="Number" placeholder="Number of months" id="bsperiodsToComparebs" className="form-control checkvalidation" value={searchMonth} onChange={(e) => setSearchMonth(e.target.value)} />
                </div>  
                <div className="col-md-2">
                    <button onClick={generateData}  className="btn btn-primary generate-btn">Generate</button>
                </div>      
                </div>
                <div className="">
                <div className="table-data-div">
                    <div className="scroll-bar"  id="">
                        <table id= "balancesheettable" className="table" cellspacing="0" width="100%">
                            {resultData}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}