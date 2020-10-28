import React, { useEffect, useRef } from "react";
import SpinnerButtonInner from "../../lib/SpinnerButtonInner";
import youtube from "../../lib/youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import ConnectStore from '../../lib/ConnectStore';
import ClashApi from '../../api/Clashes';
import ErrorAlertContainer from '../../lib/ErrorAlertContainer'
import EmailValidator from "email-validator";
import history from '../../history';
import useStickyState from '../../lib/useStickyState';
import { useAuth0 } from "@auth0/auth0-react";

const LOCAL_STORAGE_STATE_KEY = "createClash";
const DEFAULT_STATE = {
  clashName: '',
  opponentEmailAddress: '',
  youTubeUrl: '',
  trackName: '',
  commentText: '',
  errors: [],
  loading: false,
  showYouTubeUrl: true
}

const Challenge = (props) => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  const updateState = (item) => {
    const newState = Object.assign({...state}, item);
    setState(newState);
  }

  const[state, setState] = useStickyState(DEFAULT_STATE, LOCAL_STORAGE_STATE_KEY);

  const handleChange = (e) => {
    updateState({[e.target.name]:e.target.value});
  }

  const clashName_invalid = (e) => {
    const currentUser = props.currentUser;
    const name =currentUser?currentUser.name:"John";
    e.target.setCustomValidity(`Please provide a name for your clash such as '${name}'s Laidback tunes'`);
  }

  const clashName_onInput = (e) => {
    e.target.setCustomValidity('');
  }

  const youTubeUrl_AfterChange = async (e) => {
    if (state.youTubeUrl===''){
      return;
    }

    try{
      e.persist();
      const trackName = await youtube.getTitle(state.youTubeUrl);
      updateState({
        trackName,
        showYouTubeUrl: false
      })
    }catch(error){
      e.target.setCustomValidity("Invalid YouTube URL. Please review and try again.")
    }

  }

  const email_AfterChange = (e) => {
    if (!EmailValidator.validate(e.target.value)){
      e.target.setCustomValidity("Please choose a valid email address for your opponent");
    }else{
      e.target.setCustomValidity("");
    }
  }

  const clearUrl_HandleClick = (e) => {
    e.preventDefault();
    updateState({
      showYouTubeUrl: true,
      youTubeUrl: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated){
      loginWithRedirect();
      return;
    }

    const clash = {name: state.clashName,
      opponentEmailAddress: state.opponentEmailAddress,
      youTubeUrl: state.youTubeUrl,
      trackName: state.trackName,
      commentText: state.commentText
    }

    try{
      state.loading=true
      const response = await ClashApi.create(props.jwt, clash);
      const newClash = response.data.data.clash;
      setState(DEFAULT_STATE);
      history.push(`/clashes/${newClash.id}`)
    } catch(err) {
      let message='';
      let type='';
      if (err.response){
        type = 'Validation';
        message = err.response.data.message;
      } else {
        type = 'Unhandled';
        message = err.message;
      }
      setState({errors: [{type, message}]});
      setState({loading: false});
    }
  }

  const embedYouTubeUrl = youtube.embedUrl(state.youTubeUrl);
  return(
    <div ref={useRef()} className='container-fluid challenge'>
      <div className="t-clash-status mx-auto text-center p-3" style={{maxWidth: '40.25rem'}}>
        <h1>Challenge someone...</h1>

        <ErrorAlertContainer errors={state.errors}
          message='We were unable to create your clash. Please try again. If the problem persists please email support@soundcla.sh'/>

        <div style={{maxWidth: '37.5rem'}}>
            <form onSubmit={ handleSubmit } >
            <div className="row py-2 px-0 mx-0">
                <div className='col text-left px-0 mx-0' >
                      <input  required
                              value={state.clashName}
                              className="form-control"
                              name="clashName"
                              placeholder="Enter name of clash"
                              onChange={handleChange }
                              onInvalid={clashName_invalid}
                              onInput={clashName_onInput}
                              style={{background:'none'}}
                              />
                </div>
              </div>

              <div className="row py-2 px-0 mx-0">
                <div className='col text-left px-0 mx-0' >
                      <input  required
                              value={state.opponentEmailAddress}
                              className="form-control"
                              name="opponentEmailAddress"
                              placeholder="Put their email here"
                              onChange={handleChange}
                              onBlur={email_AfterChange}
                              style={{background:'none'}} />
                </div>
              </div>

              <div className="row py-2 px-0 mx-0">
                <div className='col text-center px-0 mx-0' style={{width:'100%'}}>
                  {state.showYouTubeUrl && <input required
                            value={state.youTubeUrl}
                            className="form-control"
                            name="youTubeUrl"
                            placeholder="Put your YouTube tune url here!"
                            onChange={handleChange}
                            onBlur={youTubeUrl_AfterChange}
                            style={{background:'none'}}/>}

                  {!state.showYouTubeUrl && youtube.iframe(embedYouTubeUrl, state.trackName)}
                  {!state.showYouTubeUrl &&
                    <button className="mt-1 btn btn-dark text-uppercase"
                            type="submit"
                            title="Enter a different track URL"
                            onClick={clearUrl_HandleClick}
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
                              value={state.commentText}
                              className="form-control"
                              name="commentText"
                              placeholder="Why is this a killer track?"
                              onChange={handleChange}
                              style={{background:'none'}} />
                </div>
              </div>

              <div className="py-0 px-0 mx-auto text-center " >
                <div className='px-0 '>
                  <button id='createTrack' className="btn btn-dark text-uppercase" type="submit" >
                    <SpinnerButtonInner label='Submit' loading={state.loading}/>
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ConnectStore(Challenge);