import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginOrSignUpButton = ({ buttonText = "Login or Sign up" }) => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="t-comment-submit btn btn-dark btn-sm"
      type="submit"
      onClick={() => {
        loginWithPopup();
      }}
    >
      {buttonText}
    </button>
  );
};
export default LoginOrSignUpButton;
