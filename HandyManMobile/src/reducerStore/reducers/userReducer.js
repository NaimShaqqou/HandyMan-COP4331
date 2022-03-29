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
  //Object.assign(state, state)
  switch (action.type) {
      case "login":
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profilePicture: action.payload.profilePicture,
          profileDescription: action.payload.profileDescription,
          userId: action.payload.userId,
          jwtToken: action.payload.jwtToken,
          isLoggedIn: true,
        }
      case "logout": 
        return {
          ...state,
          firstName: "",
          lastName: "",
          profilePicture: "",
          profileDescription: "",
          userId: "",
          jwtToken: "",
          isLoggedIn: false,
        }
      default:
          return state
  }
};

export default reducer