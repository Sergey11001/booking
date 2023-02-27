import AppRoutes from "./components/AppRoutes";
import {Link} from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserActions} from "./redux/user/actions";

axios.defaults.baseURL = "http://localhost:3333"
axios.defaults.withCredentials = true

function App() {
    const {ready} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(UserActions.profile())
    },[])

    return ready ? (
            <div className='w-10/12 m-auto mt-4'>
                <Header/>
                <AppRoutes/>
            </div>
        )
        :
        (
            <div className='text-lg'>
                Lading...
            </div>
        )
}

export default App;
