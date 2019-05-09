import Upload from "./Upload";
import createTrackAction from "../../../actions/createTrackAction";
import { connect } from 'react-redux';

const mapProps=(state, ownProps)=>{
  return {
    clash: ownProps.clash,
    currentUser: ownProps.currentUser,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    createTrack: (track)=>{
      dispatch(createTrackAction(track))
    }
  }
}

const connectedUpload=()=>{
  return connect(
    mapProps,
    mapDispatchToProps
  )(Upload)
}

export default connectedUpload;