import React, {Component, Fragment} from "react";
import Elapsed from "elapsed";
import Avatar from "../../../../components/Avatar";

class CommentItem extends Component{

  elapsed(comment){
    const elapsedTime = new Elapsed(new Date(comment.updated_at), new Date());
    if (elapsedTime.seconds.num<10){
      return `A few seconds ago`;
    }
    return `About ${elapsedTime.optimal} ago`;
  }

  render(){
    const comment = this.props.comment;

    return(
      <Fragment>
        <div className="row py-2 px-0 mx-0" key={comment.id}>
          <div className='col-auto text-left'>
            <Avatar user={comment.user}
                    description= "Comment user avatar"
                    size='35' />
          </div>
          <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
            <div className='t-comment-text'>{comment.comment_text}</div>
            <div className='comments__the-comment__time'>{this.elapsed(comment)}</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default CommentItem;