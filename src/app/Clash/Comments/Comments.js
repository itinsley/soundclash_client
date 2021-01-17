import React, { useState, Fragment, useEffect } from "react";
import CommentItem from "./CommentItem";
import Avatar from "../../shared/Avatar";
import SpinnerButtonInner from "../../shared/SpinnerButtonInner";
import CommentApi from "../../../api/Comments";
import HandleApiError from "../../../api/HandleApiError";
import ErrorAlertContainer from "../../shared/ErrorAlertContainer";
import { refreshClashAction } from "../../../actions";
import { useAuth0 } from "@auth0/auth0-react";

const DEFAULT_STATE = {
  newComment: "",
  loading: false,
  errors: [],
  errorMessage: "",
};

const Comment = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const { loginWithRedirect } = useAuth0();

  useEffect(() => setState(DEFAULT_STATE), []);

  function handleChange(e) {
    setState({ [e.target.name]: e.target.value });
  }

  function renderHistory() {
    return props.comments.map((comment) => (
      <CommentItem key={`comment=${comment.id}`} comment={comment} />
    ));
  }

  function clearFormState() {
    setState(DEFAULT_STATE);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setState({ loading: true });
      await CommentApi.create(props.trackId, state.newComment, props.jwt);
      props.dispatch(refreshClashAction);
      clearFormState();
    } catch (err) {
      const { errorMessage, errors } = HandleApiError(err);
      setState({
        errorMessage,
        errors,
        loading: false,
      });
    }
  }

  function renderCommentForm() {
    const currentUser = props.currentUser;

    if (currentUser) {
      return (
        <Fragment>
          <form onSubmit={handleSubmit}>
            <div className="row py-2 px-0 mx-0">
              <div className="col-auto text-left">
                <Avatar
                  user={currentUser}
                  description="Current user avatar"
                  size="60"
                />
              </div>
              <div
                className="col text-left px-0 mx-0"
                style={{ width: "100%" }}
              >
                <textarea
                  type="text"
                  required
                  rows="2"
                  value={state.newComment}
                  className="form-control"
                  name="newComment"
                  placeholder="Comment on this track"
                  onChange={handleChange}
                />
              </div>
            </div>
            <ErrorAlertContainer
              errors={state.errors}
              errorMessage={state.errorMessage}
            />

            <div className="row py-0 px-0 mx-0 justify-content-end">
              <div className="col-auto px-0">
                <button
                  className="t-comment-submit btn btn-dark btn-sm"
                  type="submit"
                >
                  <SpinnerButtonInner label="Post" loading={state.loading} />
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      );
    } else {
      return (
        <div className="my-2 text-left">
          <button
            id="login"
            variant="link"
            className="btn btn-login-link"
            onClick={() => {
              loginWithRedirect({
                appState: { returnTo: window.location.pathname },
              });
            }}
          >
            Login to leave a comment
          </button>
        </div>
      );
    }
  }

  return (
    <div>
      {renderCommentForm()}
      {renderHistory()}
    </div>
  );
};

export default Comment;
