import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginOrSignUpButton = ({ buttonText = "Login or Sign up" }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="t-comment-submit btn btn-dark btn-sm"
      type="submit"
      onClick={() => {
        loginWithRedirect({
          appState: { returnTo: window.location.pathname },
        });
      }}
    >
      {buttonText}
    </button>
  );
};
export default LoginOrSignUpButton;
