const defaultState = {
  menu: {
    isOpen: false,
  },
  recentClashes: {
    data: [],
    loading: true,
  },
  myClashes: {
    data: [],
    loading: true,
  },
  currentClash: {
    data: [],
    loading: true,
  },
  newClash: {
    data: [],
    loading: false,
  },
  currentUser: null,
  currentUserError: "",
  jwt: null,
  apiError: {
    errorMessage: "",
    errors: [],
    errorContext: "",
  },
};

// Reducer
function reducer(state = defaultState, action) {
  console.log("READUCER", action);
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        apiError: action.apiError,
      };
    case "CLEAR_ERROR":
      console.log("Reducer clearning error");
      return {
        ...state,
        apiError: {
          errorMessage: "",
          errors: [],
          errorContext: "",
        },
      };

    case "GET_RECENT_CLASHES":
      return {
        ...state,
        recentClashes: {
          data: action.recentClashes,
          loading: false,
        },
      };
    case "GET_MY_CLASHES":
      return {
        ...state,
        myClashes: {
          data: action.myClashes,
          loading: false,
        },
      };
    case "GET_CLASH":
      return {
        ...state,
        currentClash: {
          data: action.clash,
          loading: false,
        },
      };
    // Session is stored in local storage.
    // Sync should be performed to establish session expiry when user state is critical
    case "SET_USER_SESSION":
      return {
        ...state,
        currentUser: action.currentUser,
        jwt: action.jwt,
        currentUserError: "",
      };
    case "SET_USER_SESSION_ERROR":
      console.log(action, "setus");
      return {
        ...state,
        currentUser: null,
        jwt: null,
        currentUserError: action.errorMessage,
      };
    case "CLEAR_USER_SESSION":
      return {
        ...state,
        currentUser: null,
        jwt: null,
      };
    default:
      return state;
  }
}

export default reducer;
