import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";

import { ServerUrlType } from "config/constants";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";
import { initialMachine, setWorker } from "../reducers/machine/machineReducer";
import { socketConnect } from "./socket";

export const getMachineList = (
  target: number,
  onMessage: (any: any) => any
): any => {
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
        const data = result.data.find((machine) => machine.mkey === target);
        if (data) {
          dispatch(initialMachine(data));
          dispatch(getWorker(target));
          dispatch(socketConnect(target, onMessage));
        } else {
          dispatch(decreaseIndicatorState());
          location.replace("/");
        }
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);

        return false;
      });
  };
};

export const insertInstalledTransmitters = (): any => {
  const url = `${ServerUrlType.APIS}/api/cloud/installedTransmitters`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });

  return (dispatch: Dispatch) => {
    api
      .post(url, {
        sender: window.localStorage.getItem("sender"),
      })
      .then((result: AxiosResponse) => {
        const data = result.data.data;

        setTimeout(() => {
          data.forEach((item) => {
            dispatch(insertMachineStat(item.id));
          });
        }, 500);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        dispatch(decreaseIndicatorState());
      });
  };
};

export const insertMachineStat = (id: string): any => {
  const url = `${ServerUrlType.EDGE}/api/edge/edge_machine_stat`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch: Dispatch) => {
    api
      .post(url, {
        transmitter: id,
        sender: window.localStorage.getItem("sender"),
      })
      .then(() => {
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        console.log(error);
        dispatch(decreaseIndicatorState());
      });
  };
};

export const getWorker = (target: number): any => {
  const url = `${ServerUrlType.BARO}/worker/selectWorker`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch: Dispatch) => {
    api
      .get(url, {
        params: {
          sender: window.localStorage.getItem("sender"),
        },
      })
      .then((result: AxiosResponse) => {
        const worker = result.data.find((item) => +item.id === +target);
        dispatch(setWorker(worker));
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
      });
  };
};
