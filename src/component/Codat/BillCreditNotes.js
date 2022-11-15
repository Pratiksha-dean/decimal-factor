import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';

export default function BillCreditNotes(props) {
    
    const columns= [
            {
                name : "Supplier",
                selector: row => Parser(row.supplierRef),
                sortable: true
            },
            {
                name : "Number",
                selector: row => row.billCreditNoteNumber,
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
    
        const finalUrl = `${props.endUrl}/CODAT/Bill_Credit_Notes/${props.leadId}`;
        
      return (
        <Datatables apiUrl={finalUrl} apiColumn={columns} title={props.title}  />
    );
}