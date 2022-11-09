import React from "react";
import Datatables from "./Datatables";
export default function JournalEntries(props) {
    
    const columns= [
            {
                name : "Id",
                selector: row => row.id,
                sortable: true
            },
            {
                name : "Created On",
                selector: row => row.createdOn,
                sortable: true
            },
            {
                name : "Posted On",
                selector: row => row.postedOn,
                sortable: true
            },
            {
                name : "Record ref datatype",
                selector: row => row.recordRef,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Journal_Entries/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}