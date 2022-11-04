import React from "react";
import Modal from "react-bootstrap/Modal";

function ConfirmationModal() {
  return (
    <div>
      <div
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
              <button type="button" className="btn btn-primary confirm-btn">
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button> */}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ConfirmationModal;
