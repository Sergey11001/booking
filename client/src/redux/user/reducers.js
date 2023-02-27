const initialState = {
    isAuth:false,
    user: null,
    ready:false
}

export const userReducer = (state = initialState, action ) => {
    switch (action.type){
        case "SET_IS_AUTH": return ({
            ...state,
            isAuth: action.payload
        })
        case "SET_USER": return ({
            ...state,
            user: action.payload
        })
        case "SET_READY": return ({
            ...state,
            ready: action.payload
        })

        default:
            return state
    }
}