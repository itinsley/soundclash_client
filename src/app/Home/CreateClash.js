import React, { useState, useRef } from "react";
import SpinnerButtonInner from "../shared/SpinnerButtonInner";
import YouTubeInput from "../shared/YouTubeInput";
import ConnectStore from "../../lib/ConnectStore";
import ClashApi from "../../api/Clashes";
import HandleApiError from "../../api/HandleApiError";
import ErrorAlertContainer from "../shared/ErrorAlertContainer";
import EmailValidator from "email-validator";
import history from "../../history";
import useStickyState from "../../lib/useStickyState";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "reactstrap";

const LOCAL_STORAGE_STATE_KEY = "createClash";
const DEFAULT_SESSION_STATE = {
  clashName: "",
  opponentEmailAddress: "",
  commentText: "",
};
const DEFAULT_STATE = {
  errors: [],
  errorMessage: "",
  loading: false,
};

const CreateClash = (props) => {
  const errorScrollRef = React.createRef();

  const [youTubeState, setYouTubeState] = useStickyState(
    YouTubeInput.DEFAULT_STATE,
    "createClashYouTubeInput"
  );

  const { isAuthenticated, loginWithPopup } = useAuth0();

  const updateSessionState = (item) => {
    const newState = Object.assign({ ...sessionState }, item);
    setSessionState(newState);
  };

  const [sessionState, setSessionState] = useStickyState(
    DEFAULT_SESSION_STATE,
    LOCAL_STORAGE_STATE_KEY
  );
  const [state, setState] = useState(DEFAULT_STATE);

  const handleChange = (e) => {
    updateSessionState({ [e.target.name]: e.target.value });
  };

  const clashName_invalid = (e) => {
    const currentUser = props.currentUser;
    const name = currentUser ? currentUser.name : "John";
    e.target.setCustomValidity(
      `Please provide a name for your clash such as '${name}'s Laidback tunes'`
    );
  };

  const clashName_onInput = (e) => {
    e.target.setCustomValidity("");
  };

  const email_AfterChange = (e) => {
    if (!EmailValidator.validate(e.target.value)) {
      e.target.setCustomValidity(
        "Please choose a valid email address for your opponent"
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  const clearState = () => {
    setSessionState(DEFAULT_SESSION_STATE);
    setState(DEFAULT_STATE);
    setYouTubeState(YouTubeInput.DEFAULT_STATE);
  };

  const buildClash = () => {
    return {
      name: sessionState.clashName,
      opponentEmailAddress: sessionState.opponentEmailAddress,
      youTubeUrl: youTubeState.url,
      trackName: youTubeState.trackName,
      commentText: sessionState.commentText,
    };
  };

  const infoAlert = () => {
    const clash = buildClash();
    if (
      clash.name &&
      EmailValidator.validate(clash.opponentEmailAddress) &&
      clash.youTubeUrl &&
      clash.trackName &&
      clash.commentText
    ) {
      return (
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Challenge is ready to be sent.<br></br>
          Click the Submit button below to send the challenge. It will appear on
          your homepage once created.
        </div>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      loginWithPopup();
      return;
    }

    const clash = buildClash();

    console.log(clash, "clash to post");
    errorScrollRef.current.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });

    try {
      setState({ ...state, loading: true });
      const response = await ClashApi.create(props.jwt, clash);
      const newClash = response.data.data.clash;
      clearState();
      history.push(`/clashes/${newClash.id}`);
    } catch (err) {
      const { errorMessage, errors } = HandleApiError(err);
      setState({
        errorMessage,
        errors,
        loading: false,
      });
    }
  };

  return (
    <div ref={useRef()} className="container-fluid challenge">
      <div className="mx-auto text-center p-3" style={{ maxWidth: "40.25rem" }}>
        <h1>Challenge someone...</h1>

        <div ref={errorScrollRef}>
          <ErrorAlertContainer
            errors={state.errors}
            errorMessage={state.errorMessage}
          />
        </div>
        {infoAlert()}

        <div style={{ maxWidth: "37.5rem" }}>
          <form onSubmit={handleSubmit}>
            <div className="row py-2 px-0 mx-0">
              <div className="col text-left px-0 mx-0">
                <input
                  required
                  value={sessionState.clashName}
                  className="form-control"
                  name="clashName"
                  placeholder="Enter name of clash"
                  onChange={handleChange}
                  onInvalid={clashName_invalid}
                  onInput={clashName_onInput}
                  style={{ background: "none" }}
                />
              </div>
            </div>

            <div className="row py-2 px-0 mx-0">
              <div className="col text-left px-0 mx-0">
                <input
                  required
                  value={sessionState.opponentEmailAddress}
                  className="form-control"
                  name="opponentEmailAddress"
                  placeholder="Put their email here"
                  onChange={handleChange}
                  onBlur={email_AfterChange}
                  style={{ background: "none" }}
                />
              </div>
            </div>

            <div className="row py-2 px-0 mx-0">
              <YouTubeInput.Component
                state={youTubeState}
                setState={setYouTubeState}
              />
            </div>

            <div className="row py-2 px-0 mx-0">
              <div className="col text-left px-0 mx-0">
                <textarea
                  type="text"
                  required
                  value={sessionState.commentText}
                  className="form-control"
                  name="commentText"
                  placeholder="Why is this a killer track?"
                  onChange={handleChange}
                  style={{ background: "none" }}
                />
              </div>
            </div>

            <div className="py-0 px-0 mx-auto text-center ">
              <div className="px-0 ">
                <button
                  id="createTrack"
                  className="btn btn-dark text-uppercase mr-3"
                  type="submit"
                >
                  <SpinnerButtonInner
                    label="Submit"
                    loading={sessionState.loading}
                  />
                </button>
                <button
                  id="clearForm"
                  className="btn btn-dark text-uppercase"
                  type="button"
                  onClick={clearState}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectStore(CreateClash);
