import { setUserLogin } from "../reducers/authSlice"


export const loginAction = () => {
    return (dispatch) => {
        dispatch(setUserLogin())
    }

}