import Upload from "./Upload";
import createTrackAction from "../../../../actions/createTrackAction";
import fetchClashAction from "../../../../actions/fetchClashAction";
import { connect } from 'react-redux';

const mapProps=(state, ownProps)=>{
  return {
    clash: ownProps.clash,
    currentUser: ownProps.currentUser,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    createTrack: (currentUser, clashId, track)=>{
      createTrackAction(dispatch, currentUser, clashId, track).then(
        dispatch(fetchClashAction(clashId))
      )
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