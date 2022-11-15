import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommerceDisputes(props) {
    
    const columns= [
            {
                name : "Dispute",
                selector: row => row.id,
                sortable: true
            },
            {
                name : "Created Date",
                selector: row => row.createdDate,
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
                name : "Amount",
                selector: row => row.totalAmount,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status),
                sortable: true
            },

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Disputes/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}