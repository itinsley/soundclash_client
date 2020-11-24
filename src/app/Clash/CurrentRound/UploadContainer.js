import Upload from "./Upload";
import { createTrackAction, clearErrorAction } from "../../../actions";
import { connect } from "react-redux";

const mapProps = (state, ownProps) => {
  return {
    clash: state.currentClash.data,
    currentUser: state.currentUser,
    apiError: state.apiError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTrack: (track, clashId) => {
      dispatch(createTrackAction(track, clashId));
    },
    clearError: () => {
      dispatch(clearErrorAction());
    },
  };
};

const UploadContainer = () => {
  return connect(mapProps, mapDispatchToProps)(Upload);
};

export default UploadContainer();
