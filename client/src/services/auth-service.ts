import { loginData, registerData, updatePasswordPayLoadType } from "@/models/auth";
import { loginAction, registerAction, generateOtpAction, updatePasswordAction } from "@/redux/actions/auth-actions";
import store from "@/redux/store"

export const loginService = (loginData : loginData) => {
    const dispatchedResult = store.dispatch(loginAction(loginData));
    return dispatchedResult;
}

export const registerService = async (registerData: registerData) => {
    const dispatchedResult = await store.dispatch(registerAction(registerData));
    return dispatchedResult;
}

export const getOtpService = async (email: string) => {
    const dispatchedResult = await store.dispatch(generateOtpAction(email));
    return dispatchedResult;
}

export const updatePasswordService = async ( updatePasswordData : updatePasswordPayLoadType) => {
    const dispatchedResult = await store.dispatch(updatePasswordAction(updatePasswordData));
    return dispatchedResult;
}
 