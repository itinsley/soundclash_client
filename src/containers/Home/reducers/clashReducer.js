// These should probably be provided as properties to make testing easier
// but import for now
import UserSession from '../../../lib/UserSession/UserSession';

const defaultState = { 
  recentClashes: {
    data: [],
    loading: true},
  myClashes: {
      data: [],
      loading: true},
    currentUser: UserSession.get(),
}

// Reducer
function clashReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GET_RECENT_CLASHES':
      return {
        ...state,
        recentClashes:{
          data: action.recentClashes,
          loading: false
        }
      }
    case 'GET_MY_CLASHES':
      return {
        ...state,
        myClashes:{
          data: action.myClashes,
          loading: false
        }
      }
    default:
      return state
  }
}

export default clashReducer;