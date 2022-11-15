import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function CommerceOrders(props) {
    
    const columns= [
            {
                name : "Order",
                selector: row => Parser(row.orderNumber),
                sortable: true
            },
            {
                name : "Customer",
                selector: row => row.customerRef,
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
            }
            

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Commerce_Orders/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}