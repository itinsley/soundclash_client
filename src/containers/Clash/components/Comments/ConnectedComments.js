
import Comments from "../Comments/Comments";
import { connect } from 'react-redux';
import { createCommentAction, fetchClashAction } from "../../../../actions";


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
    createComment: (clashId, trackId, currentUser, commentText)=>{
      createCommentAction(dispatch, trackId, currentUser, commentText).then(
        fetchClashAction(dispatch, clashId, currentUser )
      )
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