import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';

export default function Suppliers(props) {
    
    const columns= [
            {
                name : "supplierName",
                selector: row => Parser(row.supplierName),
                sortable: true
            },
            {
                name : "contactName",
                selector: row => row.contactName,
                sortable: true
            },
            {
                name : "emailAddress",
                selector: row => row.emailAddress,
                sortable: true
            },
            {
                name : "phone",
                selector: row => row.phone,
                sortable: true
            },
            {
                name : "taxNumber",
                selector: row => Parser(row.taxNumber),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Suppliers/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}