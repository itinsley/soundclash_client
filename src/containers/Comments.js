import React, {Component, Fragment} from "react";
import CommentApi from "../api/Comments";
import CommentItem from "../components/CommentItem";
import Avatar from "../components/Avatar";
 
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
      return (
        <CommentItem comment={comment} />
      )
    })

    return comments;
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
            <Avatar user={currentUser}
                      description= "Current user avatar"
                      size='60' />
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