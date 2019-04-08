import React, {Component, Fragment} from "react";
import CommentApi from "../api/Comments";
import Elapsed from "elapsed";
 
class Comment extends Component{
  constructor(props){
    super(props);
    this.state={
      comments:[
        CommentApi.emptyStruct()
      ],
      newComment: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.state.comments = props.comments;
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  
  renderHistory(){
    const comments = this.state.comments.map(comment=>{
      const elapsedTime = new Elapsed(new Date(comment.updated_at), new Date());
      return (
        <Fragment>
          <div className="row py-2 px-0 mx-0" key={Comment.id}>
            <div className='col-md-auto text-left'>
            {this.avatar(comment.user, "Comment user avatar", 35)}
            </div>
            <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
              <div>{comment.comment_text}</div>
              <div className='comments__the-comment__time'>{elapsedTime.optimal} ago</div>
            </div>
          </div>
        </Fragment>
      )
    })

    return comments;
  }

  avatar(user, description, size){
    if (user.image_url){
      return(
        <img  alt={description} className="u-circle " height={size} 
          src={user.image_url} title={user.name} width={size}></img>
      )  
    }

    return (
      <div>{user.name.substring(0,2).toUpperCase()}</div>
    )
  }
  
  render(){
    // Refactor: make objects consistent later
    const currentUser = {
      name: this.props.currentUser.name,
      image_url : this.props.currentUser.imageUrl
    }

    return (
      <div>
        <div className="row py-2 px-0 mx-0">
          <div className='col-md-auto text-left'>
            {this.avatar(currentUser, "Current user avatar", 60)}
          </div>
          <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
              <form onSubmit={this.handleSubmit}>
                <textarea type="text" 
                        rows="2"
                        value={this.state.newComment} 
                        className="form-control" 
                        name="newComment"
                        placeholder="Comment on this track"
                        onChange={this.handleChange} /> 
              </form>
          </div>
        </div>        
        {this.renderHistory()}
      </div>
    )
  }
}

export default Comment;