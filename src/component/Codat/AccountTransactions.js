import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';

export default function AccountTransactions(props) {
    
    const columns= [
            {
                name : "Bank Account",
                selector: row => Parser(row.bankAccountRef),
                sortable: true
            },
            {
                name : "Created Date",
                selector: row => row.date,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status.replace('class="','className="')),
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
    
        const finalUrl = `${props.endUrl}/CODAT/Account_transactions/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}