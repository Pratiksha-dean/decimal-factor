import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function DirectCost(props) {
    
    const columns= [
            {
                name : "Contact",
                selector: row => Parser(row.contactRef),
                sortable: true
            },
            {
                name : "Reference",
                selector: row => row.reference,
                sortable: true
            },
            {
                name : "Account",
                selector: row => row.paymentAllocations,
                sortable: true
            },
            {
                name : "Issue Date",
                selector: row => row.issueDate,
                sortable: true
            },
            {
                name : "Currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "Total Amount",
                selector: row => row.totalAmount,
                sortable: true
            }
        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Direct_costs/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}