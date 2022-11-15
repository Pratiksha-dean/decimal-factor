import React, { useEffect, useState } from "react";
import axios from "axios";

import Parser from 'html-react-parser';
export default function CommerceCompanyinfo(props) {
   
    const [companyInfo,setComanyInfo]=useState('');       

    useEffect(()=>{
        const getCompanyDetails = async(finalUrl) =>{
            const response = await axios.get(finalUrl);
            setComanyInfo(response.data.replace('class="','className="'));
        }
        const finalUrl = `${props.endUrl}/CODAT/${props.leadId}/Commerce_Company`;
        getCompanyDetails(finalUrl);
    }, []);
    
    
    
        
        
      return (
        <div class="codatcontainer">
            <h3>Company</h3>
		       
                    <div class="table-data-div">
                        <div class="" id="">
                            <table id="commerce_Company-table" class="table table-striped table-bordered company_info_table" cellspacing="0" width="70%" border="0"><tbody>{Parser(companyInfo)}</tbody></table>
                    </div>
           
            </div>
        </div>
    );
}