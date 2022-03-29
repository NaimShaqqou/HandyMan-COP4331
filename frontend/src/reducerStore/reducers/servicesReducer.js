// Reducer for services owned by logged in user

const reducer = (
    state = {
      services: new Array()
    },
    action
  ) => {
      switch (action.type) {
          case "loginServices":
              state.services = action.payload.services
              return state
          case "addService": 
              state.services.push(action.payload.service)
              return state
          case "deleteService": 
              let index = state.services.indexOf(action.payload.service)
              if (index >= 0) {
                state.services.splice(index, 1, action.payload.service)
              }
              return state
          case "logoutServices":
              state.services = new Array()
              return state
          default:
              return state
      }
  };
  
  export default reducer
  