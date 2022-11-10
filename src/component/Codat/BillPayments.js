import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';

export default function BillPayments(props) {
    
    const columns= [
            {
                name : "Id",
                selector: row => row.id,
                sortable: true
            },
            {
                name : "Supplier",
                selector: row => row.supplierRef,
                sortable: true
            },
            {
                name : "Payment Date",
                selector: row => row.date,
                sortable: true
            },
            {
                name : "Amount",
                selector: row => row.totalAmount,
                sortable: true
            },
            {
                name : "Currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "Account Name",
                selector: row => row.accountRef,
                sortable: true
            },
            {
                name : "Note",
                selector: row => row.note,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Bill_Payment/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}