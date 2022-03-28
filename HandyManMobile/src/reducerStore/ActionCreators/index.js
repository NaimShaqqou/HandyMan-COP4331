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