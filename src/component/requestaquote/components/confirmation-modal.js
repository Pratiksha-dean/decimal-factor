import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ConfirmationModal({ setShow }) {
  return (
    <div>
      <div className="text-center">
        <div role="document">
          <div className="">
            <img
              src={require("../../../images/i-icon.png")}
              alt=""
              className="icon-div"
            />
            {/* <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> */}
            <div className="">
              <h5 className="modal-title" id="confirmationModalCenterTitle">
                Verify Email Address!
              </h5>
              <p>Don’t forget to verify email before accessing account.</p>
              <button
                type="button"
                className="btn btn-primary confirm-btn"
                onClick={() => setShow(false)}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
