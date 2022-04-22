// do NOT modify state argument. make and return a new copy instead

const reducer = (
  state = {
    username: "",
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
              username: action.payload.username,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              profilePicture: action.payload.profilePicture,
              profileDescription: action.payload.profileDescription,
              userId: action.payload.userId,
              jwtToken: action.payload.jwtToken
            }
        case "logout": 
            return {
              username: "",
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
