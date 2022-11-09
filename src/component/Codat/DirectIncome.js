import React from "react";
import Datatables from "./Datatables";
export default function DirectIncome(props) {
    
    const columns= [
            {
                name : "Contact",
                selector: row => row.contactRef,
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
                name : "Payment Date",
                selector: row => row.issueDate,
                sortable: true
            },
            {
                name : "currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "Total Amount",
                selector: row => row.totalAmount,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/DirectIncome/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}