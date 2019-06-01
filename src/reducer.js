// These should probably be provided as properties to make testing easier
// but import for now
import UserSession from './lib/UserSession/UserSession';

const defaultState = {
  menu:{
    isOpen: false
  },
  recentClashes: {
    data: [],
    loading: true},
  myClashes: {
      data: [],
      loading: true},
  currentClash:{
      data: [],
      loading: true},
  newClash:{},
  currentUser: UserSession.get(),
  isLoginModalOpen: false,
  loginContext: ''
}

// Reducer
function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return{
        ...state,
        menu:{
          isOpen: !state.menu.isOpen
        }
      }
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
        currentUser: null,
        menu:{
          isOpen: false
        },        
      }
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.currentUser,
        isLoginModalOpen: false
      }
    case 'OPEN_LOGIN_FORM':
      return {
        ...state,
        menu:{
          isOpen: false
        },        
        isLoginModalOpen: true,
        loginContext: action.loginContext
      }
    case 'CLOSE_LOGIN_FORM':
      return {
        ...state,
        isLoginModalOpen: false
      }
    // Session is stored in local storage.
    // Sync should be performed to establish session expiry when user state is critical
    case 'SYNC_USER_SESSION':
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}


export default reducer;