import React, {Component} from "react";
import SpinnerButtonInner from "../../../../lib/SpinnerButtonInner";
import youtube from "../../../../lib/youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

class Upload extends Component{

  constructor(props){
    super(props)
    this.state={
      youTubeUrl: '',
      trackName: '',
      commentText: '',
      loading: false,
      showYouTubeUrl: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.youTubeUrl_AfterChange = this.youTubeUrl_AfterChange.bind(this);
    this.clearUrl_HandleClick = this.clearUrl_HandleClick.bind(this);
    this.scrollReference = React.createRef();
  }

  async youTubeUrl_AfterChange(e){
    if (this.state.youTubeUrl==''){
      return;
    }
    try{
      const trackName = await youtube.getTitle(this.state.youTubeUrl);
      this.setState({
        trackName,
        showYouTubeUrl: false
      })
    }catch(error){
      alert("Invalid YouTube URL. Please review and try again.")
    }

  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  clearUrl_HandleClick(event){
    event.preventDefault();
    this.setState({
      showYouTubeUrl: true,
      youTubeUrl: ''
    })
    this.scrollReference.current.scrollIntoView({behavior: 'smooth'})
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    this.props.createTrack(this.props.currentUser,
                            this.props.clash.id,
                            {commentText: this.state.commentText,
                             youTubeUrl: this.state.youTubeUrl,
                             name: this.state.trackName})
  }

  render(){
    const clash = this.props.clash;
    const embedYouTubeUrl = youtube.embedUrl(this.state.youTubeUrl);

    //Belt and braces on private information
    if(clash.private_info.current_user_is_involved){
      const previousTrack = clash.previous_track;
      const otherPlayer = clash.private_info.other_player;
      return (
        <div ref={this.scrollReference} className='container-fluid current-round-intro'>
          <div className="t-clash-status mx-auto text-center p-3" style={{maxWidth: '40.25rem'}}>
            <p>
              <strong>{otherPlayer.name}</strong> just played <em>{previousTrack.name}</em>
            </p>
            <p>
              <strong>Now it's your turn...</strong>
            </p>

            <div style={{maxWidth: '37.5rem'}}>
              <form onSubmit={this.handleSubmit} >
                <div className="row py-2 px-0 mx-0">
                  <div className='col text-center px-0 mx-0' style={{width:'100%'}}>
                    {this.state.showYouTubeUrl && <input  required
                              value={this.state.youTubeUrl}
                              className="form-control"
                              name="youTubeUrl"
                              placeholder="Put your YouTube tune url here!"
                              onChange={this.handleChange}
                              onBlur={this.youTubeUrl_AfterChange}
                              style={{background:'none'}}/>}

                    {!this.state.showYouTubeUrl && youtube.iframe(embedYouTubeUrl, this.state.trackName)}
                    {!this.state.showYouTubeUrl && 
                      <button className="mt-1 btn btn-dark text-uppercase" 
                              type="submit" 
                              title="Enter a different track URL"
                              onClick={this.clearUrl_HandleClick}
                              >
                        <FontAwesomeIcon icon={faBackspace} size="lg"/>
                      </button>
                    }


                  </div>
                </div>
                <div className="row py-2 px-0 mx-0">
                  <div className='col text-left px-0 mx-0' >
                        <textarea type="text"
                                required
                                value={this.state.commentText}
                                className="form-control"
                                name="commentText"
                                placeholder="Say what you have to say"
                                onChange={this.handleChange}
                                style={{background:'none'}} />
                  </div>
                </div>
                <div className="py-0 px-0 mx-auto text-center " >
                <div className='px-0 '>
                  <button className="btn btn-dark text-uppercase" type="submit" >
                    <SpinnerButtonInner label='Submit' loading={this.state.loading}/>
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
    return null;
  }
}

export default Upload;