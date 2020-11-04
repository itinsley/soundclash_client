import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import ConnectStore from "../../lib/ConnectStore";
import Loading from "../shared/Loading";

const CurrentUser = ({ currentUser }) => {
  if (!currentUser) {
    console.log("loading..");
    return <Loading />;
  } else {
    return (
      <div className="mx-auto text-center" style={{ maxWidth: "56.25rem" }}>
        <div className="top-element-margin"></div>
        <h1 className="px-2 p-3">Hi {currentUser.name}</h1>
        <h2>Your details</h2>
        <table className="table">
          <tbody>
            <tr>
              <td align="right" className="font-weight-bold">
                Id:
              </td>
              <td align="left">{currentUser.id}</td>
            </tr>
            <tr>
              <td align="right" className="font-weight-bold">
                Name:
              </td>
              <td align="left">{currentUser.name}</td>
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
                Picture:
              </td>
              <td align="left">
                {" "}
                <img alt="Current user avatar" src={currentUser.image_url} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
export default withAuth0(ConnectStore(CurrentUser));
