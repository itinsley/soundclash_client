import CreateClash from "./CreateClash";
import createClashAction from "../../actions/createClashAction";
import { connect } from 'react-redux';
import loginContext from '../shared/LoginContext';

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
    },
    onOpenLoginModal: ()=>{
      dispatch({
        type: 'OPEN_LOGIN_FORM',
        loginContext: loginContext.Challenge
      })
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