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
      newComment: "",
      Errors: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state.comments = props.comments;
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  
  renderHistory(){
    const comments = this.state.comments.map((comment)=>{
      if (comment.new){
        return (
          <Fragment>
            <CommentItem key={`comment=${comment.id}`} comment={comment} />
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
      const response = await CommentApi.create(this.props.trackId, this.state.newComment, this.props.currentUser );
      const comments =[{...response.data, new: true}, ...this.state.comments];
      this.setState({
        comments: comments,
        newComment: ''
      });
    } catch(error){
      console.log("Errors", error)
      alert(`Could not create Comment: ${error.response.data.status}`);
      this.setState({Errors: error.response.data.errors})
    }
  }


render(){
    // Refactor: make objects consistent later
    const currentUser = {
      name: this.props.currentUser.name,
      image_url : this.props.currentUser.imageUrl
    }
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
          <div className="row py-2 px-0 mx-0">
            <div className='col-md-auto text-left'>
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
          <div className='col-md-auto px-0'>
            <input className="btn btn-dark btn-sm" type="submit" value="Post" />
          </div>
        </div>
        </form>
        {this.renderHistory()}
      </div>
    )
  }
}

export default Comment;