import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function Transfers(props) {
    
    const columns= [
            {
                name : "Transfer",
                selector: row => Parser(row.description),
                sortable: true
            },
            {
                name : "From",
                selector: row => row.from,
                sortable: true
            },
            {
                name : "To",
                selector: row => row.to,
                sortable: true
            },
            {
                name : "Transfer date",
                selector: row => row.date,
                sortable: true
            },
            {
                name : "From Currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "From Amount",
                selector: row => row.amount,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Transfers/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}