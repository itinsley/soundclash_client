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

export default {
  emptyStruct,
}