
import Comments from "./Comments";
import { connect } from 'react-redux';
import { createCommentAction } from "../../../actions";


const mapProps=(state, ownProps)=>{
  return {
    comments: ownProps.track.comments,
    currentUser: ownProps.currentUser,
    trackId: ownProps.track.id,
    clashId: state.currentClash.data.id
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    createComment: async (trackId, commentText, cb)=>{
      dispatch(createCommentAction(trackId, commentText)).then(cb);
    }
  }
}

// Returns Comments component wrapped in Connect
// Supply the properties used in ownProps when you render the returned component
const CommentContainer = ()=> {
  return connect(
   mapProps,
   mapDispatchToProps
 )(Comments)
}

export default CommentContainer();