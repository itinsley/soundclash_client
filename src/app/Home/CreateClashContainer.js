import CreateClash from "./CreateClash";
import createClashAction from "../../actions/createClashAction";
import { connect } from 'react-redux';

const mapProps=(state, ownProps)=>{
  return {
    newClash: state.newClash,
    currentUser: state.currentUser,
    myClashes: state.myClashes
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    createClash: (newClash)=>{
      dispatch(createClashAction(newClash))
    }
  }
}

const CreateClashContainer=()=>{
  return connect(
    mapProps,
    mapDispatchToProps
  )(CreateClash)
}

export default CreateClashContainer();