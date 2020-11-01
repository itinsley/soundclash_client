import Comments from "./Comments";
import { connect } from "react-redux";

const mapProps = (state, ownProps) => {
  return {
    comments: ownProps.track.comments,
    currentUser: state.currentUser,
    trackId: ownProps.track.id,
    clashId: state.currentClash.data.id,
    jwt: state.jwt,
  };
};

// Returns Comments component wrapped in Connect
// Supply the properties used in ownProps when you render the returned component
const CommentContainer = () => {
  return connect(mapProps)(Comments);
};

export default CommentContainer();
