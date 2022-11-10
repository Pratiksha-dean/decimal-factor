import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function Items(props) {
    
    const columns= [
            {
                name : "Name",
                selector: row => Parser(row.name),
                sortable: true
            },
            {
                name : "Code",
                selector: row => row.code,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.itemStatus.replace('class="','className="')),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Items/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}