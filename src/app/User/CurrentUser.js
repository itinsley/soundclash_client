import React, { Fragment, useEffect, Suspense } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ConnectStore from "../../lib/ConnectStore";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  updateCurrentUserAction,
  actionContexts,
  clearErrorAction,
} from "../../actions";
import ConnectedErrorAlert from "../shared/ConnectedErrorAlert";
import { EditText } from "react-edit-text";
import { Img } from "react-image";
import Avatar from "../shared/Avatar";

const BooleanInput = ({ value, onClick }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={value ? faCheckSquare : faSquare}
        size="lg"
        onClick={onClick}
        className="t-unsubscribe mr-2"
      />
      <span className="t-unsubscribed-status">
        {value ? "Unsubscribed" : "Send Notifcations"}
      </span>
    </div>
  );
};

const CurrentUser = ({ currentUser, dispatch }) => {
  const Input_Save = (propertyName, value) => {
    dispatch(
      updateCurrentUserAction({
        ...currentUser,
        [propertyName]: value,
      })
    );
  };

  useEffect(() => {
    dispatch(clearErrorAction);
  }, [dispatch]);

  if (!currentUser) {
    return null;
  } else {
    return (
      <div className="mx-auto text-center" style={{ maxWidth: "40.25rem" }}>
        <div className="top-element-margin"></div>
        <h1 className="px-2 p-3 t-user-detail-heading">
          Hi {currentUser.name}
        </h1>
        <h2>Your details</h2>
        <table className="table" style={{ maxWidth: "40.25rem" }}>
          <tbody>
            <tr>
              <td align="right" className="font-weight-bold">
                Id:
              </td>
              <td align="left">{currentUser.id}</td>
            </tr>
            <tr>
              <td align="right" className="font-weight-bold">
                Email:
              </td>
              <td align="left">{currentUser.email}</td>
            </tr>
            <tr>
              <td align="right" className="font-weight-bold">
                Internal reference:
              </td>
              <td align="left">{currentUser.sub}</td>
            </tr>
            <tr>
              <td align="right" className="font-weight-bold">
                Name:
              </td>
              <td align="left">{currentUser.name}</td>
            </tr>
            <tr>
              <td align="right" className="font-weight-bold">
                Avatar Url:
              </td>
              <td align="left">
                <EditText
                  name="image_url"
                  placeholder="Enter Avatar Url"
                  style={{ width: "20.25rem" }}
                  value={currentUser.image_url}
                  onSave={(e) => Input_Save("image_url", e.value)}
                />
                {currentUser.image_url && (
                  <Avatar
                    user={currentUser}
                    description="User avatar"
                    size="50"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td align="right" className="font-weight-bold">
                Unsubscribe from user notifications and reminders:
              </td>
              <td align="left">
                <ConnectedErrorAlert
                  actionContext={actionContexts.UPDATE_USER}
                />

                <BooleanInput
                  value={currentUser.unsubscribed}
                  onClick={(e) =>
                    Input_Save("unsubscribed", !currentUser.unsubscribed)
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
export default withAuthenticationRequired(ConnectStore(CurrentUser));
