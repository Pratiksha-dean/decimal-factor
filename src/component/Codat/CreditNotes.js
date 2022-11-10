import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';


export default function CreditNotes(props) {
    
    const columns= [
            {
                name : "Customer",
                selector: row => Parser(row.customerRef),
                sortable: true
            },
            {
                name : "Number",
                selector: row => row.creditNoteNumber,
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
            },
            {
                name : "Remaining Credit",
                selector: row => row.remainingCredit,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status.replace('class="','className="')),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/CreditNotes/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}