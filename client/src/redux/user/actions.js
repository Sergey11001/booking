import axios from "axios";

export const UserActions = {
    setIsAuth: (bool) => ({
        type: "SET_IS_AUTH",
        payload: bool
    }),
    setUser: (name) => ({
        type: "SET_USER",
        payload: name
    }),
    setReady: (bool) => ({
        type:"SET_READY",
        payload: bool
    }),
    loginUser: ({email, password}) => dispatch => {
            return axios.post('/login', {email, password}).then(() => {
                dispatch(UserActions.profile())
            })
    },
    logoutUser: () => dispatch => {
        axios.post('logout').then(() => {
            dispatch(UserActions.setUser(null))
            dispatch(UserActions.setIsAuth(false))
        })
    },
    profile: () => dispatch => {
        return axios.get('/profile').then(({data}) => {
            dispatch(UserActions.setUser(data))
            dispatch(UserActions.setIsAuth(true))
        }).finally(() => dispatch(UserActions.setReady(true)))
    }
}