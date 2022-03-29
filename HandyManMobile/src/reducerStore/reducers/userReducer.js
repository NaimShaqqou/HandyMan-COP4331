const reducer = (
  state = {
    firstName: "",
    lastName: "",
    profilePicture: "",
    profileDescription: "",
    userId: "",
    jwtToken: "",
    isLoading: true,
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
          isLoading: false,
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
          isLoading: false,
        }
      default:
          return state
  }
};

export default reducer