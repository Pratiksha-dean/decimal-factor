import React from "react";
import Datatables from "./Datatables";
import Parser from "html-react-parser";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
export default function Accounts(props) {
  const columns = [
    {
      name: "Name",
      selector: (row) => Parser(row.name),
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.nominalCode,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="button-tooltip-2">{row.description}</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div
              ref={ref}
              {...triggerHandler}
              className="ml-2 cursor-pointer ellipsis-text"
            >
              {row.description}{" "}
            </div>
          )}
        </OverlayTrigger>
      ),
      sortable: true,
    },
    {
      name: "Current Balance",
      selector: (row) => row.currentBalance,
      sortable: true,
    },
    {
      name: "Currency",
      selector: (row) => row.currency,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => Parser(row.status.replace('class="', 'className="')),
      sortable: true,
    },
  ];

  const finalUrl = `${props.endUrl}/CODAT/Accounts/${props.leadId}`;

  return (
    <Datatables apiUrl={finalUrl} apiColumn={columns} title={props.title} />
  );
}
