import React, { useState, useRef } from "react";
import SpinnerButtonInner from "../../lib/SpinnerButtonInner";
import youtube from "../../lib/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import ConnectStore from "../../lib/ConnectStore";
import ClashApi from "../../api/Clashes";
import HandleApiError from "../../api/HandleApiError";
import ErrorAlertContainer from "../../lib/ErrorAlertContainer";
import EmailValidator from "email-validator";
import history from "../../history";
import useStickyState from "../../lib/useStickyState";
import { useAuth0 } from "@auth0/auth0-react";

const LOCAL_STORAGE_STATE_KEY = "createClash";
const DEFAULT_SESSION_STATE = {
  clashName: "",
  opponentEmailAddress: "",
  youTubeUrl: "",
  trackName: "",
  commentText: "",
  showYouTubeUrl: true,
};
const DEFAULT_STATE = {
  errors: [],
  errorMessage: "",
  loading: false,
};

const Challenge = (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

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

  const youTubeUrl_AfterChange = async (e) => {
    if (sessionState.youTubeUrl === "") {
      return;
    }

    try {
      e.persist();
      const trackName = await youtube.getTitle(sessionState.youTubeUrl);
      updateSessionState({
        trackName,
        showYouTubeUrl: false,
      });
    } catch (error) {
      e.target.setCustomValidity(
        "Invalid YouTube URL. Please review and try again."
      );
    }
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

  const clearUrl_HandleClick = (e) => {
    e.preventDefault();
    updateSessionState({
      showYouTubeUrl: true,
      youTubeUrl: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    const clash = {
      name: sessionState.clashName,
      opponentEmailAddress: sessionState.opponentEmailAddress,
      youTubeUrl: sessionState.youTubeUrl,
      trackName: sessionState.trackName,
      commentText: sessionState.commentText,
    };

    try {
      setState({ ...state, loading: true });
      const response = await ClashApi.create(props.jwt, clash);
      const newClash = response.data.data.clash;
      setSessionState(DEFAULT_SESSION_STATE);
      setState(DEFAULT_STATE);
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

  const embedYouTubeUrl = youtube.embedUrl(sessionState.youTubeUrl);
  return (
    <div ref={useRef()} className="container-fluid challenge">
      <div
        className="t-clash-status mx-auto text-center p-3"
        style={{ maxWidth: "40.25rem" }}
      >
        <h1>Challenge someone...</h1>

        <ErrorAlertContainer
          errors={state.errors}
          errorMessage={state.errorMessage}
        />

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
              <div
                className="col text-center px-0 mx-0"
                style={{ width: "100%" }}
              >
                <input
                  required
                  value={sessionState.youTubeUrl}
                  hidden={!sessionState.showYouTubeUrl}
                  className="form-control"
                  name="youTubeUrl"
                  placeholder="Put your YouTube tune url here!"
                  onChange={handleChange}
                  onBlur={youTubeUrl_AfterChange}
                  style={{ background: "none" }}
                />

                {!sessionState.showYouTubeUrl &&
                  youtube.iframe(embedYouTubeUrl, sessionState.trackName)}
                {!sessionState.showYouTubeUrl && (
                  <button
                    className="mt-1 btn btn-dark text-uppercase"
                    type="submit"
                    title="Enter a different track URL"
                    onClick={clearUrl_HandleClick}
                  >
                    <FontAwesomeIcon icon={faBackspace} size="lg" />
                  </button>
                )}
              </div>
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
                  className="btn btn-dark text-uppercase"
                  type="submit"
                >
                  <SpinnerButtonInner
                    label="Submit"
                    loading={sessionState.loading}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectStore(Challenge);
