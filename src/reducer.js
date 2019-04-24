// These should probably be provided as properties to make testing easier
// but import for now
import UserSession from './lib/UserSession/UserSession';

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
function reducer(state = defaultState, action) {
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
    case 'LOAD_USER_SESSION':
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}

export default reducer;