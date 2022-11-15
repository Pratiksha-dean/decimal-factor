import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommerceProducts(props) {
    
    const columns= [
            {
                name : "Product",
                selector: row => Parser(row.name),
                sortable: true
            },
            {
                name : "category",
                selector: row => row.categorization,
                sortable: true
            },
            {
                name : "Created Date",
                selector: row => row.createdDate,
                sortable: true
            }
            

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Products/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}