import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";
import Avatar from "../../shared/Avatar";
import SpinnerButtonInner from "../../shared/SpinnerButtonInner";
import CommentApi from "../../../api/Comments";
import HandleApiError from "../../../api/HandleApiError";
import ErrorAlertContainer from "../../shared/ErrorAlertContainer";
import { refreshClashAction } from "../../../actions";

const DEFAULT_STATE = {
  newComment: "",
  loading: false,
  errors: [],
  errorMessage: "",
};

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormState = this.clearFormState.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderHistory() {
    return this.props.comments.map((comment) => (
      <CommentItem key={`comment=${comment.id}`} comment={comment} />
    ));
  }

  clearFormState() {
    this.setState(DEFAULT_STATE);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({ loading: true });
      await CommentApi.create(
        this.props.trackId,
        this.state.newComment,
        this.props.jwt
      );
      this.props.dispatch(refreshClashAction);
      this.clearFormState();
    } catch (err) {
      const { errorMessage, errors } = HandleApiError(err);
      this.setState({
        errorMessage,
        errors,
        loading: false,
      });
    }
  }

  renderCommentForm() {
    const currentUser = this.props.currentUser;

    if (currentUser) {
      return (
        <Fragment>
          <form onSubmit={this.handleSubmit}>
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
                  value={this.state.newComment}
                  className="form-control"
                  name="newComment"
                  placeholder="Comment on this track"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <ErrorAlertContainer
              errors={this.state.errors}
              errorMessage={this.state.errorMessage}
            />

            <div className="row py-0 px-0 mx-0 justify-content-end">
              <div className="col-auto px-0">
                <button
                  className="t-comment-submit btn btn-dark btn-sm"
                  type="submit"
                >
                  <SpinnerButtonInner
                    label="Post"
                    loading={this.state.loading}
                  />
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      );
    } else {
      return (
        <div className="my-2 text-left">
          <strong>
            <Link to={"/login"}>Login</Link>
          </strong>{" "}
          to leave a comment
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderCommentForm()}
        {this.renderHistory()}
      </div>
    );
  }
}

export default Comment;
