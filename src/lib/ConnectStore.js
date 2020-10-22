import { connect } from 'react-redux';

// I'm sure there must be a simpler way of connecting an object to the state
// but I can't find it. This pattern means components dispatch thunks directly
// and access the entire state directly, which is small enough to not require mapping
// If the state grows considerably, it will be simple to wrap the components in a custom
// container and map as necessary.
const ConnectStore = connect(
  (state)=>state
)

export default ConnectStore;
