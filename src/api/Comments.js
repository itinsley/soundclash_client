import apiAuthenticatedPost from "./apiAuthenticatedPost";

const create = async (trackId, commentText, jwt) => {
  const payload = {
    comment: { comment_text: commentText },
  };

  return await apiAuthenticatedPost(`tracks/${trackId}/comments`, jwt, payload);
};

const comments = { create };
export default comments;
