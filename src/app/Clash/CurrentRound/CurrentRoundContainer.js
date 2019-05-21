import { connect } from 'react-redux';
import CurrentRound from './CurrentRound';

const mapProps=(state, ownProps)=>{
  return {
    currentUser: state.currentUser,
    clash: state.currentClash.data
  }
}

const CurrentRoundContainer = ()=> {
  return connect(
   mapProps
 )(CurrentRound)
}

export default CurrentRoundContainer();