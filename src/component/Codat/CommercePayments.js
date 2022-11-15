import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommercePayments(props) {
    
    const columns= [
            {
                name : "Payments",
                selector: row => Parser(row.id),
                sortable: true
            },
            {
                name : "Type",
                selector: row => row.type,
                sortable: true
            },
            {
                name : "Created Date",
                selector: row => row.createdDate,
                sortable: true
            },
            {
                name : "Due Date",
                selector: row => row.modifiedDate,
                sortable: true
            },
            {
                name : "Currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "Amount",
                selector: row => row.amount,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status),
                sortable: true
            },
            

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Payments/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}