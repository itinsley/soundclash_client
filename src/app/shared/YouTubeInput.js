import React, { useState } from "react";
import youtube from "../../lib/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {string} state.url
 * @param {string} state.trackName
 * @param {boolean} state.showUrl
 * @param {funtion} setState
 *
 */
const YouTubeInput = ({ state, setState }) => {
  const embedYouTubeUrl = () => youtube.embedUrl(state.url);

  const clearUrl_HandleClick = (e) => {
    e.preventDefault();
    setState({
      showUrl: true,
      url: "",
    });
  };

  const handleChange = (e) => {
    setInternalUrlState(e.target.value);
  };

  const youTubeUrl_AfterChange = async (e) => {
    if (internalUrlState === "") {
      return;
    }

    try {
      e.persist();
      const trackName = await youtube.getTitle(internalUrlState);

      setState({
        url: internalUrlState,
        trackName,
        showUrl: false,
      });
    } catch (error) {
      e.target.setCustomValidity(
        "Invalid YouTube URL. Please review and try again."
      );
    }
  };

  const [internalUrlState, setInternalUrlState] = useState("");

  return (
    <div className="col text-center px-0 mx-0" style={{ width: "100%" }}>
      <input
        required
        value={internalUrlState}
        hidden={!state.showUrl}
        className="form-control"
        name="url"
        placeholder="Put your YouTube tune url here!"
        onChange={handleChange}
        onBlur={youTubeUrl_AfterChange}
        style={{ background: "none" }}
      />
      {!state.showUrl && youtube.iframe(embedYouTubeUrl(), state.trackName)}
      {!state.showUrl && (
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
  );
};

export default YouTubeInput;
