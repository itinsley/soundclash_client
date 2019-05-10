import { connect } from 'react-redux';
import { loginAction, facebookLoginAction } from "../../actions"
import Login from "./Login";

const mapProps=(state)=>{
  return {
    currentUser: state.currentUser,
    isLoginModalOpen: state.isLoginModalOpen
  }
}

const mapDispatchToProps=(dispatch, ownProps)=>{
  return {
    soundClashlogin: async (email, password)=>{
      await dispatch(loginAction(email, password));
    },
    afterFacebookLogin: async (fbResponse)=>{
      await dispatch(facebookLoginAction(fbResponse));
    },
    onCloseLoginModal:()=>{
      dispatch({
        type: 'CLOSE_LOGIN_FORM'
      })
    }
  }
}

const LoginContainer = ()=> {
  return connect(
   mapProps,
   mapDispatchToProps
 )(Login)
}

export default LoginContainer();