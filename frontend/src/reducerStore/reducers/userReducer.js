// do NOT modify state argument. make and return a new copy instead

const reducer = (
  state = {
    firstName: "",
    lastName: "",
    profilePicture: "",
    profileDescription: "",
    userId: "",
    jwtToken: "",
  },
  action
) => {
    switch (action.type) {
        case "login":
            return {
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              profilePicture: action.payload.profilePicture,
              profileDescription: action.payload.profileDescription,
              userId: action.payload.userId,
              jwtToken: action.payload.jwtToken
            }
        case "logout": 
            return {
              firstName: "",
              lastName: "",
              profilePicture: "",
              profileDescription: "",
              userId: "",
              jwtToken: ""
            }
        default:
            return state
    }
};

export default reducer
