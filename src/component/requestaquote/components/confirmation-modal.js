import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ConfirmationModal() {
  const [show, setShow] = useState();
  return (
    <div>
      {/* <div
        className="modal fade"
        id="confirmationModalCenter"
        tabindex={1}
        role="dialog"
        aria-labelledby="confirmationModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <img
              src={require("../../../images/i-icon.png")}
              alt=""
              className="icon-div"
            />
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body">
              <h5 className="modal-title" id="confirmationModalCenterTitle">
                Verify Email Address!
              </h5>
              <p>Don’t forget to verify email before accessing account.</p>
              <button
                type="button"
                className="btn btn-primary confirm-btn"
                onClick={() => setShow(true)}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ConfirmationModal;
