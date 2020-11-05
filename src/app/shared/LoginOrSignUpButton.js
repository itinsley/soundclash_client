import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginOrSignUpButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="t-comment-submit btn btn-dark btn-sm"
      type="submit"
      onClick={() => {
        loginWithPopup();
      }}
    >
      Login or Sign up to start playing
    </button>
  );
};
export default LoginOrSignUpButton;
