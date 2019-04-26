import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import CommentApi from "../../../../api/Comments";
import CommentItem from "./CommentItem";
import Avatar from "../../../../components/Avatar";

class Comment extends Component{
  constructor(props){
    super(props);
    this.state={
      newComment: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  renderHistory(){
    const comments = this.props.comments.map((comment)=>{
      if (comment.new){
        return (
          <Fragment key={`comment=${comment.id}`}>
            <CommentItem  comment={comment} />
            <hr/>
          </Fragment>
        )
      } else
        return (
          <CommentItem key={`comment=${comment.id}`} comment={comment} />
        )
    })
    return comments;
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.props.createComment(this.props.trackId, this.props.currentUser, this.state.newComment );
    } catch(error){
      console.log("Errors", error)
      alert(`Could not create Comment`);
    }
  }

renderCommentForm(){
  if (this.props.currentUser && this.props.currentUser.userName){
    const currentUser = {
      name: this.props.currentUser.userName,
      image_url : this.props.currentUser.imageUrl
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <div className="row py-2 px-0 mx-0">
          <div className='col-auto text-left'>
            <Avatar user={currentUser}
                      description= "Current user avatar"
                      size='60' />
          </div>
          <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
                <textarea type="text"
                        rows="2"
                        value={this.state.newComment}
                        className="form-control"
                        name="newComment"
                        placeholder="Comment on this track"
                        onChange={this.handleChange} />
          </div>
        </div>
        <div className="row py-0 px-0 mx-0 justify-content-end" >
          <div className='col-auto px-0'>
            <input className="btn btn-dark btn-sm" type="submit" value="Post" />
          </div>
        </div>
      </form>
    )
  } else{
    return (
      <span>
        <Link to={'/login'} >Login</Link> to add a comment
      </span>
    )
  }
}

render(){
  return (
      <div>
        {this.renderCommentForm()}
        {this.renderHistory()}
      </div>
    )
  }
}

export default Comment;