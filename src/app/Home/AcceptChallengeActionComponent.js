import React, { Fragment, useState } from "react";
import SpinnerButtonInner from "../../lib/SpinnerButtonInner";
import ClashApi from "../../api/Clashes";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorAlertContainer from "../../lib/ErrorAlertContainer";
import HandleApiError from "../../api/HandleApiError";

const AcceptChallengeActionComponent = ({
  uniqueRef,
  jwt,
  currentUser,
  onSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [acceptButtonLoading, setAcceptButtonLoading] = useState(false);

  if (!currentUser) {
    return <LoginOrSignUpButton />;
  }

  return (
    <Fragment>
      <ErrorAlertContainer errors={errors} errorMessage={errorMessage} />
      <button
        className="t-comment-submit btn btn-dark btn-sm"
        type="submit"
        onClick={async () => {
          setAcceptButtonLoading(true);
          try {
            const clash = await ClashApi.acceptChallenge(uniqueRef, jwt);
            onSuccess();
          } catch (err) {
            const { errorMessage, errors } = HandleApiError(err);
            setErrorMessage(errorMessage);
            setErrors(errors);
          }
          setAcceptButtonLoading(false);
        }}
      >
        <SpinnerButtonInner
          label="Accept and start playing"
          loading={acceptButtonLoading}
        />
      </button>
    </Fragment>
  );
};

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

export default AcceptChallengeActionComponent;
