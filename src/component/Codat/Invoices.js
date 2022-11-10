import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';


export default function Invoices(props) {
    
    const columns= [
            {
                name : "Invoice",
                selector: row => Parser(row.invoiceNumber),
                sortable: true
            },
            {
                name : "Customer",
                selector: row => row.customerRef,
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
                name : "Invoice Amount",
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
    
        const finalUrl = `${props.endUrl}/CODAT/Invoices/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}