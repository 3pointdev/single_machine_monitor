import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import sha256 from "sha256";
import LoginModel from "src/models/login/login.model";
import { postLogin } from "../reducers/auth/loginReducer";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";

export const fetchLogin = (account: LoginModel) => {
  const url = `${process.env.NEXT_PUBLIC_BARO_URL}/login/login`;
  return (dispatch: Dispatch) => {
    dispatch(increaseIndicatorState());

    axios
      .post(url, {
        ...account,
        sender: window.localStorage.getItem("sender"),
        password: sha256(account.password),
      })
      .then((response: AxiosResponse) => {
        dispatch(postLogin(response.data));
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        dispatch(postLogin(error));
        dispatch(decreaseIndicatorState());
      });
  };
};
