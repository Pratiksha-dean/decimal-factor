import React from "react";
import Datatables from "./Datatables";
export default function TaxRates(props) {
    
    const columns= [
            {
                name : "Id",
                selector: row => row.id,
                sortable: true
            },
            {
                name : "Name",
                selector: row => row.name,
                sortable: true
            },
            {
                name : "Code",
                selector: row => row.code,
                sortable: true
            },
            {
                name : "Effective Tax Rate",
                selector: row => row.effectiveTaxRate,
                sortable: true
            },
            {
                name : "Total Tax Rate",
                selector: row => row.totalTaxRate,
                sortable: true
            }

        ];
    
        const finalUrl = `${props.endUrl}/CODAT/Tax_Rates/${props.leadId}`;
        
      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}