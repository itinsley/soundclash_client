import axios from 'axios';
const create= async(currentUser, clashId, name, commentText, youTubeUrl)=>{
  const uri = `api/clashes/${clashId}/tracks?jwt=${currentUser.jwt}`
  const response = await axios.post(uri, {
            uri: youTubeUrl,
            comment_text: commentText,
            name: name
          });
  return response;
}

export default{
  create
}