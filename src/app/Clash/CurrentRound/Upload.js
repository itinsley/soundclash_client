import React, { useState, useEffect } from "react";
import SpinnerButtonInner from "../../shared/SpinnerButtonInner";
import YouTubeInput from "../../shared/YouTubeInput";
import Loading from "../../shared/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import ConnectedErrorAlert from "../../shared/ConnectedErrorAlert";
import { actionContexts } from "../../../actions";
import Track from "../Track/Track";

const Upload = ({ clash, createTrack, clearError, apiError }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [youTubeState, setYouTubeState] = useState(YouTubeInput.DEFAULT_STATE);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const commentText_handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const clearState = () => {
    setCommentText("");
    setYouTubeState(YouTubeInput.DEFAULT_STATE);
    clearError();
  };

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const track = {
      commentText: commentText,
      youTubeUrl: youTubeState.url,
      name: youTubeState.trackName,
    };
    createTrack(track, clash.id);
    setLoading(false);
  }

  useEffect(() => {
    clearError();
  }, [clearError]);

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
  }

  if (!clash.private_info.other_player) {
    return <Loading />;
  }

  const previousTrack = clash.previous_track;
  const otherPlayer = clash.private_info.other_player;
  const ownerTrack = clash.owner_track;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" current-round-intro col-sm-12 text-center p-3">
          <div
            className="t-clash-status mx-auto text-center p-3"
            style={{ maxWidth: "40.25rem" }}
          >
            <p>
              <strong>{otherPlayer.name}</strong> just played{" "}
              <em>{previousTrack.name}</em>
            </p>
            <p>
              <strong>Now it's your turn...</strong>
            </p>

            <div style={{ maxWidth: "37.5rem" }}>
              <form onSubmit={handleSubmit}>
                <ConnectedErrorAlert
                  actionContext={actionContexts.CREATE_TRACK}
                />

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
                      value={commentText}
                      className="form-control"
                      name="commentText"
                      placeholder="Say what you have to say"
                      onChange={commentText_handleChange}
                      style={{ background: "none" }}
                    />
                  </div>
                </div>
                <div className="py-0 px-0 mx-auto text-center ">
                  <div className="px-0 ">
                    <button
                      className="btn btn-dark text-uppercase mr-3 t-btn-submit"
                      type="submit"
                    >
                      <SpinnerButtonInner label="Submit" loading={loading} />
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
        <OwnerTrack {...{ ownerTrack }} />
      </div>
    </div>
  );
};

const OwnerTrack = ({ ownerTrack }) => {
  // We only need to show this track if it is the owner's track. If the last track was the opponents
  // it will show in the history as a completed round
  if (!ownerTrack) return null;

  return (
    <div className="col-sm-12 text-center p-3 container-gutters">
      <Track track={ownerTrack} />
    </div>
  );
};
export default Upload;
