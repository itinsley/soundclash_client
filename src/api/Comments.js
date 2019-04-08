import axios from 'axios';

const emptyStruct=()=>{
  return {
    "id": 0,
    "comment_text": "",
    "updated_at": "",
    "user": {
      "name": "",
      "image_url": null
    }
  }
}

const create= async(trackId, commentText, currentUser)=>{
  const uri = `/tracks/${trackId}/comments.json?jwt=${currentUser.jwt}`
  const response = await axios.post(uri, {comment_text: commentText});
  return response;
}

export default {
  emptyStruct,
  create
}