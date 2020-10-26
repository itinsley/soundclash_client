
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
  newClash:{
        data: [],
        loading: false},
  currentUser: null,
  jwt: null
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
    case 'CREATE_CLASH_POST':
      return {
        ...state,
        newClash:{ loading:true }
      }
    case 'CREATE_CLASH_ERROR':
      return {
        ...state,
        newClash:{ loading: false },
        errors: action.errors,
      }
    case 'CREATE_CLASH_SUCCESS':
      return {
        ...state,
        newClash:{ loading: false },
        errors: []
      }
    // Session is stored in local storage.
    // Sync should be performed to establish session expiry when user state is critical
    case 'SET_USER_SESSION':
      return {
        ...state,
        currentUser: action.currentUser,
        jwt: action.jwt
      }
    default:
      return state
  }
}


export default reducer;