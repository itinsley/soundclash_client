import React, { Fragment, useState } from "react";
import SpinnerButtonInner from "../shared/SpinnerButtonInner";
import ClashApi from "../../api/Clashes";
import ErrorAlertContainer from "../shared/ErrorAlertContainer";
import HandleApiError from "../../api/HandleApiError";
import LoginOrSignUpButton from "../shared/LoginOrSignUpButton";

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
    return (
      <LoginOrSignUpButton buttonText="Login or Sign up to start playing" />
    );
  }

  return (
    <Fragment>
      <ErrorAlertContainer errors={errors} errorMessage={errorMessage} />
      <button
        className="btn btn-dark btn-sm"
        type="submit"
        onClick={async () => {
          setAcceptButtonLoading(true);
          try {
            await ClashApi.acceptChallenge(uniqueRef, jwt);
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

export default AcceptChallengeActionComponent;
