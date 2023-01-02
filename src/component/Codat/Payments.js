import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Datatables from "./Datatables";
export default function Payments(props) {

    const columns = [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Customer",
        selector: (row) => row.customerRef,
        sortable: true,
      },
      {
        name: "Payment Date",
        selector: (row) => row.date,
        sortable: true,
      },
      {
        name: "Amount",
        selector: (row) => row.totalAmount,
        sortable: true,
      },
      {
        name: "Currency",
        selector: (row) => row.currency,
        sortable: true,
      },
      {
        name: "Account Name",
        selector: (row) => row.accountName,
        sortable: true,
      },
      {
        name: "Note",
        selector: (row) => (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="button-tooltip-2">{row.note}</Tooltip>}
          >
            {({ ref, ...triggerHandler }) => (
              <div
                ref={ref}
                {...triggerHandler}
                className="ml-2 cursor-pointer ellipsis-text"
              >
                {row.note}{" "}
              </div>
            )}
          </OverlayTrigger>
        ),
        sortable: true,
      },
    ];

        const finalUrl = `${props.endUrl}/CODAT/Payments/${props.leadId}`;

      return (
        <Datatables title={props.title} apiUrl={finalUrl} apiColumn={columns} />
    );
}