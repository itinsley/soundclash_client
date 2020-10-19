import Navigation from  './Navigation'
import { connect } from 'react-redux';

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isOpen: state.menu.isOpen
  }
}

const ConnectedNavigation = connect(
  mapStateToProps,
)(Navigation)

export default ConnectedNavigation;