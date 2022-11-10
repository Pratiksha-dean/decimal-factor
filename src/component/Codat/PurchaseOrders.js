import React from "react";
import Parser from 'html-react-parser'
import Datatables from "./Datatables";
export default function PurchaseOrders(props) {
    
    const columns= [
            {
                name : "purchase Orders",
                selector: row => Parser(row.purchaseOrderNumber),
                sortable: true
            },
            {
                name : "Supplier Name",
                selector: row => row.supplierRef,
                sortable: true
            },
            {
                name : "Issue Date",
                selector: row => row.issueDate,
                sortable: true
            },
            {
                name : "currency",
                selector: row => row.currency,
                sortable: true
            },
            {
                name : "Amount",
                selector: row => row.totalAmount,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status.replace('class="','className="')),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/PurchaseOrder/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}