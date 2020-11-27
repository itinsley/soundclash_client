import React, { useState, useEffect } from "react";
import Users from "../../api/Users";

const Unsubscribe = (props) => {
  const unsubscribeId = props.match.params.unsubscribeId;
  const [message, setMessage] = useState(null);
  const failMessage =
    "Apologies. An error occurred attempting to unsubscribe you. Please try logging in to review your status";

  useEffect(() => {
    Users.unsubscribe(unsubscribeId)
      .then((message) => {
        setMessage(message);
      })
      .catch((e) => {
        setMessage(failMessage);
      });
  }, [unsubscribeId]);

  return (
    <div className="mx-auto text-center" style={{ maxWidth: "40.25rem" }}>
      <div className="top-element-margin"></div>
      <h1 className="px-2 p-3">Unsubscribe from notifications and reminders</h1>
      <hr />
      <h2 className="px-2 p-3 t-user-detail-heading"></h2>
      <h3>{message}</h3>
    </div>
  );
};

export default Unsubscribe;
