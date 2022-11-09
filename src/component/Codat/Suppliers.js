import React from "react";
import Datatables from "./Datatables";
export default function Suppliers(props) {
    
    const columns= [
            {
                name : "supplierName",
                selector: row => row.supplierName,
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
                selector: row => row.taxNumber,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Suppliers/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}