import { setUserLogin } from "../reducers/authSlice"
import { setUserLogOut } from "../reducers/authSlice"

export const loginAction = () => {
    return (dispatch) => {
        dispatch(setUserLogin())
    }

}


export const logOutAction = () => {
    return (dispatchEvent) => {
        dispatchEvent(setUserLogOut())
    }
}