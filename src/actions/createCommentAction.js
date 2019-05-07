import CommentApi from '../api/Comments';


async function createCommentAction(dispatch, trackId, currentUser, commentText){
  const comment = await CommentApi.create(trackId, commentText, currentUser)
  dispatch({
    type: 'CREATE_COMMENT',
    comment: {...comment.data, new: true},
    trackId,
  })
  return comment;
}

export default createCommentAction;