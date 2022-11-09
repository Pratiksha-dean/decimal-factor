import React from "react";
import Parser from 'html-react-parser'
import Datatables from "./Datatables";
export default function Bills(props) {
    
    const columns= [
            {
                name : "Supplier",
                selector: row => Parser(row.supplierRef),
                sortable: true
            },
            {
                name : "Reference",
                selector: row => row.reference,
                sortable: true
            },
            {
                name : "Issue Date",
                selector: row => row.issueDate,
                sortable: true
            },
            {
                name : "Due Date",
                selector: row => row.dueDate,
                sortable: true
            },
            {
                name : "Currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "Bill Amount",
                selector: row => row.totalAmount,
                sortable: true
            },
            {
                name : "Amount Due",
                selector: row => row.amountDue,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status.replace('class="','className="')),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Bills/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}