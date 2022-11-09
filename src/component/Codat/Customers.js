import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';



export default function Customers(props) {
    
    const columns= [
            {
                name : "Customer Name",
                selector: row => Parser(row.customerName),
                sortable: true
            },
            {
                name : "Contact Name",
                selector: row => row.contactName,
                sortable: true
            },
            {
                name : "Email",
                selector: row => row.emailAddress,
                sortable: true
            },
            {
                name : "Phone",
                selector: row => row.phone,
                sortable: true
            },
            {
                name : "Currency",
                selector: row => row.defaultCurrency,
                sortable: true
            },
            {
                name : "taxNumber",
                selector: row => row.taxNumber,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Customers/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns}  />
    );
}