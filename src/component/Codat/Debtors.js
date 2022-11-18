import React, {  useState } from "react";
import axios from "axios";

import Parser from 'html-react-parser';
export default function Debtors(props) {
    const [startDate, setStartDate] = useState('');
    const [dayLength, setDayLength] = useState(30);
    const [noOfPriod, setNoOfPriod] = useState(5);
    const [reportBy, setreportBy] = useState('');
    const [resultData,setResultData]=useState('');       


    const generateData = async () => {
        if(dayLength !=='' && noOfPriod !=='' && startDate !==''){
            const finalUrl = `${props.endUrl}/CODAT/Aged_Debtors${reportBy}/${props.leadId}/${dayLength}/${noOfPriod}/${startDate}`;
            const response = await axios.get(finalUrl);
            setResultData(Parser(response.data));
        } else {
            alert('Please fill all the required fill');
        }        
    }
    
    
    
        
        
      return (
        <div>
	        <div className="col-md-12 no-padding"><h3>Aged Debtors</h3></div>
            <div className="row">
            <div className="col-md-2  debtors">
                <label>Date</label>
                <input type="date" id="startdateac" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>   
                <div className="col-md-2  debtors">
                <label>Period length days</label>
                <input type="number" id="periodLengthac" value={dayLength} onChange={(e) => setDayLength(e.target.value)} />
            </div>   
                <div className="col-md-2  debtors">
                <label>Number of periods</label>
                <input type="Number"  className="form-control" value={noOfPriod} onChange={(e) => setNoOfPriod(e.target.value)} />
            </div>  
            <div className="col-md-3  debtors">
                <button className="btn btn-primary generate-btn" onClick={generateData}>Load aged Debtors</button>
            </div>   
            </div>
            <div className="com-md-12 ">
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-2 debtors"><label className="group-report">Group report by</label></div>
                    <div className="col-md-2 debtors">
                    <select className="group" onChange={(e)=>{setreportBy(e.target.value); setTimeout(generateData,1000);}}>
                            <option value="">Currency</option>
                            <option value="_group">Debtor</option>
                        </select>
                    </div>
            </div> 
            <div className="">
                <div className="table-data-div">
                    <div id="groupcurrencycred">
                        <div className=""><h3>GBP</h3></div>
                        <div className=" scroll-bar scroll-bar-2">
                            <table id="agedcreditors-table" className="table table-striped table-bordered" cellspacing="0" width="100%" border="0">
                                {resultData}
                            </table>
                         </div>
                    </div>
                    <div className="col s12"  id="groupcred">
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}