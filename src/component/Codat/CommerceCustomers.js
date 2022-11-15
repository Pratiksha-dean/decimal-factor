import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommerceCustomers(props) {
    
    const columns= [
            {
                name : "Customer",
                selector: row => Parser(row.customerName),
                sortable: true
            },
            {
                name : "Email",
                selector: row => row.emailAddress,
                sortable: true
            },
            {
                name : "Currency",
                selector: row => row.defaultCurrency,
                sortable: true
            },
            {
                name : "Telephone Number",
                selector: row => row.phone,
                sortable: true
            },

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Customers/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}