const initialState = {
    places:[],
    changedPlace:null
}

export const placesReducer = (state = initialState, action ) => {
    switch (action.type){
        case "SET_NEW_PLACE": return ({
            ...state,
            places: [...state.places, action.payload]
        })
        case "SET_ALL_PLACES": return ({
            ...state,
            places: action.payload
        })
        case "SET_CHANGED_PLACE": return ({
            ...state,
            changedPlace: action.payload
        })
        default:
            return state
    }
}