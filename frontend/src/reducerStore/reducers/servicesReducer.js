// Reducer for services owned by logged in user
// do NOT modify state argument. make and return a new copy instead

const reducer = (
    state = {
      services: []
    },
    action
  ) => {
      switch (action.type) {
          case "loginServices":
            return {...state, services: action.payload.services}
          case "addService": 
              return {...state, services: [...state.services, action.payload.service]}
          case "deleteService": 
              let deleteIndex = state.services.indexOf(action.payload.service)
              return {...state, services: state.services.filter((service, index) => {
                    if (index !== deleteIndex) return (service)
              })}
          case "logoutServices":
              return {...state, services: new Array() }
          case "updateServices":
            const index = state.services.findIndex(service => service._id === action.payload.service._id);

            const newArray = [...state.services];

            newArray[index] = action.payload.service

            return { 
                ...state, 
                services: newArray, 
               }
          default:
              return state
      }
  };
  
  export default reducer
  