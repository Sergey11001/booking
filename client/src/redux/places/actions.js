import axios from "axios";

export const PlacesActions = {
    setNewPlace: (place) => ({
        type: "SET_NEW_PLACE",
        payload: place
    }),
   setAllPlaces: (places) => ({
       type:"SET_ALL_PLACES",
       payload: places
   }),
    setChangedPlace: place => ({
        type:"SET_CHANGED_PLACE",
        payload:place
    }),
    fetchAllPlaces: () => dispatch => {
        axios.get('/places').then(({data}) => dispatch(PlacesActions.setAllPlaces(data)))
    }
}