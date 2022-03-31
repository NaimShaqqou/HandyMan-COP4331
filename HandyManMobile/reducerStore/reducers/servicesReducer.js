// reducer for services owned by logged in user
const reducer = (
    state = {
        services: new Array()
    },
    action
) => {
    switch (action.type) {
        case "loginServices":
            return {
                ...state,
                services: action.payload.services
            }
        case "addService":
            return {
                ...state,
                services: [...state.services, action.payload.service]
            }
        case "deleteService":
            return {
                ...state,
                services: state.services.filter(service => service !== action.payload.service)
            }
        case "logout":
            return {
                ...state,
                services: new Array()
            }
        default:
            return state
    }
}

export default reducer