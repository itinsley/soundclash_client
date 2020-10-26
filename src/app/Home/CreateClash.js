import React, {Component, Fragment} from "react";
import SpinnerButtonInner from "../../lib/SpinnerButtonInner";
import youtube from "../../lib/youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import ConnectStore from '../../lib/ConnectStore';
import createClashAction from "../../actions/createClashAction";
import ErrorAlertContainer from '../../lib/ErrorAlertContainer'
import EmailValidator from "email-validator";

class Challenge extends Component{

  constructor(props){
    super(props)
    this.state={
      clashName: '',
      opponentEmailAddress: '',
      youTubeUrl: '',
      trackName: '',
      commentText: '',
      loading: false,
      showYouTubeUrl: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.clashName_invalid = this.clashName_invalid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.youTubeUrl_AfterChange = this.youTubeUrl_AfterChange.bind(this);
    this.clearUrl_HandleClick = this.clearUrl_HandleClick.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  clashName_invalid(e){
    const currentUser = this.props.currentUser;
    const name =currentUser?currentUser.name:"John";
    e.target.setCustomValidity(`Please provide a name for your clash such as '${name}'s Laidback tunes'`);
  }

  clashName_onInput(e){
    e.target.setCustomValidity('');
  }

  async youTubeUrl_AfterChange(e){
    if (this.state.youTubeUrl===''){
      return;
    }

    try{
      e.persist();
      const trackName = await youtube.getTitle(this.state.youTubeUrl);
      this.setState({
        trackName,
        showYouTubeUrl: false
      })
    }catch(error){
      e.target.setCustomValidity("Invalid YouTube URL. Please review and try again.")
    }

  }

  email_AfterChange(e){
    if (!EmailValidator.validate(e.target.value)){
      e.target.setCustomValidity("Please choose a valid email address for your opponent");
    }else{
      e.target.setCustomValidity("");
    }
  }

  clearUrl_HandleClick(event){
    event.preventDefault();
    this.setState({
      showYouTubeUrl: true,
      youTubeUrl: ''
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    const newClash = {name: this.state.clashName,
      opponentEmailAddress: this.state.opponentEmailAddress,
      youTubeUrl: this.state.youTubeUrl,
      trackName: this.state.trackName,
      commentText: this.state.commentText
    }

    this.props.dispatch(createClashAction(newClash));
  }

  render(){
    const embedYouTubeUrl = youtube.embedUrl(this.state.youTubeUrl);
    return(
      <div ref={this.scrollReference} className='container-fluid challenge'>
        <div className="t-clash-status mx-auto text-center p-3" style={{maxWidth: '40.25rem'}}>
          <h1>Challenge someone...</h1>

          <ErrorAlertContainer errors={this.props.errors}
            message='We were unable to create your clash. Please try again. If the problem persists please email support@soundcla.sh'/>

          <div style={{maxWidth: '37.5rem'}}>
              <form onSubmit={this.handleSubmit} >
              <div className="row py-2 px-0 mx-0">
                  <div className='col text-left px-0 mx-0' >
                        <input  required
                                value={this.state.clashName}
                                className="form-control"
                                name="clashName"
                                placeholder="Enter name of clash"
                                onChange={this.handleChange }
                                onInvalid={this.clashName_invalid}
                                onInput={this.clashName_onInput}
                                style={{background:'none'}}
                                />
                  </div>
                </div>

                <div className="row py-2 px-0 mx-0">
                  <div className='col text-left px-0 mx-0' >
                        <input  required
                                value={this.state.opponentEmailAddress}
                                className="form-control"
                                name="opponentEmailAddress"
                                placeholder="Put their email here"
                                onChange={this.handleChange}
                                onBlur={this.email_AfterChange}
                                style={{background:'none'}} />
                  </div>
                </div>

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
                                placeholder="Why is this a killer track?"
                                onChange={this.handleChange}
                                style={{background:'none'}} />
                  </div>
                </div>
                <div className="py-0 px-0 mx-auto text-center " >
                  <div className='px-0 '>
                    <button id='createTrack' className="btn btn-dark text-uppercase" type="submit" >
                      <SpinnerButtonInner label='Submit' loading={this.props.newClash.loading}/>
                    </button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ConnectStore(Challenge);