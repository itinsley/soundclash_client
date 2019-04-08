import React, {Component, Fragment} from "react";
import Elapsed from "elapsed";
import Avatar from "./Avatar";
 
class CommentItem extends Component{
  
  render(){
    const comment = this.props.comment;
    const elapsedTime = new Elapsed(new Date(comment.updated_at), new Date());

    return(
      <Fragment>
        <div className="row py-2 px-0 mx-0" key={comment.id}>
          <div className='col-md-auto text-left'>
            <Avatar user={comment.user}
                    description= "Comment user avatar"
                    size='35' />
          </div>
          <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
            <div>{comment.comment_text}</div>
            <div className='comments__the-comment__time'>{elapsedTime.optimal} ago</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default CommentItem;