const reducer = (
  state = {
    firstName: "",
    lastName: "",
    profilePicture: "",
    profileDescription: "",
    userId: "",
    jwtToken: "",
    isLoggedIn: false,
  },
  action
) => {
    switch (action.type) {
        case "login":
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.profilePicture = action.payload.profilePicture
            state.profileDescription = action.payload.profileDescription
            state.userId = action.payload.userId
            state.jwtToken = action.payload.jwtToken
            state.isLoggedIn = true
            return state
        case "logout": 
            state.firstName = ""
            state.lastName = ""
            state.profilePicture = ""
            state.profileDescription = ""
            state.userId = ""
            state.jwtToken = ""
            state.isLoggedIn = false
            return state
        default:
            return state
    }
};

export default reducer
