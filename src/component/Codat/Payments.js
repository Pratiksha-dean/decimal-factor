import React from "react";
import Datatables from "./Datatables";
export default function Payments(props) {
    
    const columns= [
            {
                name : "Id",
                selector: row => row.id,
                sortable: true
            },
            {
                name : "Customer",
                selector: row => row.customerRef,
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
                selector: row => row.accountName,
                sortable: true
            },
            {
                name : "Note",
                selector: row => row.note,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Payments/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}