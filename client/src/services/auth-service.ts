import { loginData, registerData } from "@/models/auth";
import { loginAction, registerAction } from "@/redux/actions/auth-actions";
import store from "@/redux/store"

export const loginService = (loginData : loginData) => {
    const dispatchedResult = store.dispatch(loginAction(loginData));
    return dispatchedResult;
}

export const registerService = async (registerData: registerData) => {
    const dispatchedResult = await store.dispatch(registerAction(registerData));
    return dispatchedResult;
}