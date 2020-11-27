import React, { useEffect } from "react";
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

const BooleanInput = ({ value, onClick }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={value ? faCheckSquare : faSquare}
        size="lg"
        onClick={onClick}
      />
    </div>
  );
};

const CurrentUser = ({ currentUser, dispatch }) => {
  const User_Unsubscribed_Click = (event) => {
    dispatch(
      updateCurrentUserAction({
        ...currentUser,
        unsubscribed: !currentUser.unsubscribed,
      })
    );
  };

  const ImageUrl_Save = (event) => {
    dispatch(
      updateCurrentUserAction({
        ...currentUser,
        image_url: event.value,
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
        <h1 className="px-2 p-3">Hi {currentUser.name}</h1>
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
                  style={{ width: "20.25rem" }}
                  value={currentUser.image_url}
                  onSave={ImageUrl_Save}
                />
                <img alt="Current user avatar" src={currentUser.image_url} />
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
                  onClick={User_Unsubscribed_Click}
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
