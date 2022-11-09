import React from "react";
import Datatables from "./Datatables";
import Parser from 'html-react-parser';
export default function TrackingCategories(props) {
    
    const columns= [
            {
                name : "Name",
                selector: row => Parser(row.name),
                sortable: true
            },
            {
                name : "Associated",
                selector: row => row.parentId,
                sortable: true
            },
            {
                name : "Status",
                selector: row => Parser(row.status.replace('class="','className="')),
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Tracking_categories/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}