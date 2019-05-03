import React, {Component} from "react";
import SpinnerButtonInner from "../../../../lib/SpinnerButtonInner";

class Upload extends Component{

  constructor(props){
    super(props)
    this.state={
      youTubeUrl: '',
      commentText: '',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    this.props.createTrack(this.props.currentUser,
                            this.props.clash.id,
                            {commentText: this.state.commentText,
                             youTubeUrl: this.state.youTubeUrl,
                             name: 'NOTYETI'})
  }

  render(){
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;

    //Belt and braces on private information
    if(clash.private_info.current_user_is_involved){
      const previousTrack = clash.previous_track;
      const otherPlayer = clash.private_info.other_player;
      return (
        <div className='container-fluid current-round-intro'>
          <div className='t-clash-status col-sm-12 text-center p-3' >
            <p>
              <strong>{otherPlayer.name}</strong> just played <em>{previousTrack.name}</em>
            </p>
            <p>
              <strong>Now it's your turn...</strong>
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="row py-2 px-0 mx-0">
                <div className='col-auto text-left'>
                </div>
                <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
                      <input  required
                              value={this.state.youTubeUrl}
                              className="form-control"
                              name="youTubeUrl"
                              placeholder="Put your YouTube tune url here!"
                              onChange={this.handleChange} />
                </div>
                <div className='col text-left px-0 mx-0' style={{width:'100%'}}>
                      <textarea type="text"
                              required
                              value={this.state.commentText}
                              className="form-control"
                              name="commentText"
                              placeholder="Say what you have to say"
                              onChange={this.handleChange} />
                </div>
              </div>
              <div className="row py-0 px-0 mx-0 justify-content-end" >
                <div className='col-auto px-0'>
                  <button className="btn btn-dark btn-sm" type="submit" >
                    <SpinnerButtonInner label='Submit' loading={this.state.loading}/>
                  </button>
                </div>
              </div>
              </form>
          </div>
        </div>
      )
    }
    return null;
  }
}

export default Upload;