import Upload from "./Upload";
import createTrackAction from "../../../actions/createTrackAction";
import { connect } from "react-redux";

const mapProps = (state, ownProps) => {
  console.log("Uokoiadcitauber", state);
  return {
    clash: state.currentClash.data,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTrack: (track) => {
      dispatch(createTrackAction(track));
    },
  };
};

const UploadContainer = () => {
  return connect(mapProps, mapDispatchToProps)(Upload);
};

export default UploadContainer();
