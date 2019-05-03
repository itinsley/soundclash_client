
import Comments from "../Comments/Comments";
import { connect } from 'react-redux';
import { createCommentAction } from "../../../../actions";

const mapProps=(state, ownProps)=>{
  return {
    comments: ownProps.track.comments,
    currentUser: ownProps.currentUser,
    trackId: ownProps.track.id,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    createComment: (trackId, currentUser, commentText)=>{
      createCommentAction(dispatch, trackId, currentUser, commentText)
    }
  }
}

// Returns Comments component wrapped in Connect
// Supply the properties used in ownProps when you render the returned component
const ConnectedComments = ()=> {
  return connect(
   mapProps,
   mapDispatchToProps
 )(Comments)
}

export default ConnectedComments;