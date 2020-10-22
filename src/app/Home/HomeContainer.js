import Home from './Home';
import { connect } from 'react-redux';
import { withAuth0 } from '@auth0/auth0-react';

const ConnectedHome = connect(
  (state)=>state
)(Home)

export default withAuth0(ConnectedHome);