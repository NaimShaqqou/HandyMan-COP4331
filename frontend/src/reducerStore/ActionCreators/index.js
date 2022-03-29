export const updateCurrentUser = (userInfo) => {
    return (dispatch) => [
        dispatch({
            type:"login",
            payload: userInfo
        })
    ]
}

export const logoutUser = () => {
    return (dispatch) => [
        dispatch({
            type:"logout"
        })
    ]
}

export const loginServices = (services) => {
    return (dispatch) => [
        dispatch({
            type:"login",
            payload: {services: services}
        })
    ]
}

export const addService = (service) => {
    return (dispatch) => [
        dispatch({
            type:"addService",
            payload: {service: service}
        })
    ]
}

export const deleteService = (service) => {
    return (dispatch) => [
        dispatch({
            type:"deleteService",
            payload: {service: service}
        })
    ]
}

export const logoutServices = () => {
    return (dispatch) => [
        dispatch({
            type:"logout"
        })
    ]
}