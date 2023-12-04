import { Order } from "./order";

export type loginData = {
  email: string;
  password: string;
};

export type registerData = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
}

export type updatePasswordPayLoadType = {
    email: string,
    otp: string,
    password: string
}

export type User = {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    orderHistory: Order[],
    createdAt: string,
    updatedAt: string
}

export type loginSuccessResponse = {
    success: boolean,
    message: string,
    user: User | null,
    token: string
}

export type loginErrorResponse = {
    success: boolean,
    message: string,
    error: string
}
