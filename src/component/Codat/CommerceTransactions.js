import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommerceTransactions(props) {
    
    const columns= [
            {
                name : "Transactions",
                selector: row => row.id,
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
                name : "transaction Source",
                selector: row => Parser(row.transactionSourceRef),
                sortable: true
            },
            

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Transactions/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}