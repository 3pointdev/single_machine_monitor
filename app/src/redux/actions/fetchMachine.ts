import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";

import { ServerUrlType } from "config/constants";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";
import { setMachineList } from "../reducers/machine/machineListReducer";

export const getMachineList = (): any => {
  const url = `${ServerUrlType.BARO}/machine/currentList`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch: Dispatch) => {
    dispatch(increaseIndicatorState());
    api
      .get(url, { params: { sender: window.localStorage.getItem("sender") } })
      .then((result: AxiosResponse<any[]>) => {
        dispatch(setMachineList(result.data));
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        dispatch(decreaseIndicatorState());
        return false;
      });
  };
};
