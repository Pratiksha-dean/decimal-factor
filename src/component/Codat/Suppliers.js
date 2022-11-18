import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';

export default function Suppliers(props) {
    
    const columns= [
            {
                name : "Supplier name",
                selector: row => Parser(row.supplierName),
                sortable: true
            },
            {
                name : "Contact name",
                selector: row => row.contactName,
                sortable: true
            },
            {
                name : "Email address",
                selector: row => row.emailAddress,
                sortable: true
            },
            {
                name : "Phone",
                selector: row => row.phone,
                sortable: true
            },
            {
                name : "Tax number",
                selector: row => Parser(row.taxNumber),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Suppliers/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}