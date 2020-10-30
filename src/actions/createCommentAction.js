import CommentApi from '../api/Comments';
import refreshClashAction from "./refreshClashAction";

const createCommentAction=(trackId, commentText)=>async(dispatch, getState)=>{
  const state = getState();
  const jwt = state.jwt;
  const comment = await CommentApi.create(trackId, commentText, jwt)
  dispatch({
    type: 'CREATE_COMMENT',
    comment: {...comment.data, new: true},
    trackId,
  })
  dispatch(refreshClashAction);
}

export default createCommentAction;