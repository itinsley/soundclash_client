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
  currentClash:{
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
    case 'GET_CLASH':
      return {
        ...state,
        currentClash:{
          data: action.clash,
          loading: false
        }
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null
      }
    // Session is stored in local storage.
    // Sync should be performed where user state is critical to pick up session expiry
    case 'SYNC_USER_SESSION':
      return {
        ...state,
        currentUser: action.currentUser
      }
    case 'CREATE_COMMENT':
      // No state change, adding the event for the record
      return {
        ...state,
      }
    case 'CREATE_TRACK':
      // No state change, adding the event for the record
      return {
        ...state,
      }
    default:
      return state
  }
}


export default reducer;