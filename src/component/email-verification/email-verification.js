import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { verifyAccount } from "../../request";

export default function EmailVerification() {
  const { token } = useParams();
  const [message, setMessage] = useState({ type: "", text: "" });
  useEffect(() => {
    verifyAccount(token)
      .then((resp) => {
        if (resp.data.status == "success") {
          if (resp.data.message_text == "successfully verified") {
            setMessage({
              type: "success",
              text: "Your email has been successfully verified",
            });
          }
        } else {
          setMessage({
            type: "error",
            text: "Something went wrong",
          });
        }
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: confirmation-modal.js ~ line 13 ~ verifyAccount ~ err",
          err
        );
      });
  }, [token]);

  return (
    <div className="App text-center">
      <div className="container-fluid">
        <div className="row">
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={require("../../images/login-logo.png")}
              alt=""
              className="login-logo"
            />
            {message.text && (
              <div className="my-3">
                <Alert variant="success">
                  <h5>{message.text}</h5>
                </Alert>

                {message.type == "success" && (
                  <div>
                    Click here to <NavLink to="/login">Login</NavLink>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
