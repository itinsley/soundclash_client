import { connect } from 'react-redux';
import { loginAction } from "../actions"
import Login from "../components/Login";

const mapProps=(state)=>{
  return {
    currentUser: state.currentUser,
    isLoginModalOpen: state.isLoginModalOpen
  }
}

const mapDispatchToProps=(dispatch, ownProps)=>{
  return {
    login: async (email, password)=>{
      await dispatch(loginAction(email, password));
    },
    onCloseLoginModal:()=>{
      dispatch({
        type: 'CLOSE_LOGIN_FORM'
      })
    }
  }
}

const connectedLogin = ()=> {
  return connect(
   mapProps,
   mapDispatchToProps
 )(Login)
}

export default connectedLogin;