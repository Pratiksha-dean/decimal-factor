import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { verifyAccount } from "../../../request";
import { getVerificationToken, removeData } from "./personal-details";

function ConfirmationModal({ setShow }) {
  const token = getVerificationToken();
  const navigate = useNavigate();

  const confirmAccount = () => {
    verifyAccount(token)
      .then((resp) => {
        if (resp.status == "success") {
          console.log(
            "🚀 ~ file: confirmation-modal.js ~ line 10 ~ verifyAccount ~ resp",
            resp
          );
          setShow(false);
          navigate("/login");
          removeData();
        }
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: confirmation-modal.js ~ line 13 ~ verifyAccount ~ err",
          err
        );
        setShow(false);
      });
  };
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
                onClick={() => confirmAccount()}
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
