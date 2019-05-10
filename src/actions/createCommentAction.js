import CommentApi from '../api/Comments';
import refreshClashAction from "./refreshClashAction";

const createCommentAction=(trackId, commentText)=>async(dispatch, getState)=>{
  const state = getState();
  const currentUser = state.currentUser;
  const comment = await CommentApi.create(trackId, commentText, currentUser)
  dispatch({
    type: 'CREATE_COMMENT',
    comment: {...comment.data, new: true},
    trackId,
  })
  dispatch(refreshClashAction);
}

export default createCommentAction;