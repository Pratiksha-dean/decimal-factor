import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommerceLocation(props) {
    
    const columns= [
            {
                name : "Location",
                selector: row => Parser(row.name),
                sortable: true
            },
            {
                name : "Address Type",
                selector: row => row.addresstype,
                sortable: true
            },
            {
                name : "Address",
                selector: row => row.address,
                sortable: true
            }
            

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Location/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}