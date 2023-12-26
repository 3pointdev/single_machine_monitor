import { Dispatch } from "redux";
import { insertInstalledTransmitters } from "./fetchInitialize";

let socket: WebSocket;

export const socketConnect = (
  target: number,
  onMessage: (any: any) => any
): any => {
  socket = new WebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}${window.localStorage.getItem(
      "sender"
    )}?ent=${window.localStorage.getItem("enterprise")}&view=mid:${target}`,
    "transmitter"
  );
  socket.onopen = socketOnOpen;
  socket.onmessage = onMessage;
  socket.onerror = socketOnError;
  socket.onclose = socketOnClose;

  return (dispatch: Dispatch) => {
    dispatch(insertInstalledTransmitters());
  };
};

export const socketOnOpen = () => {
  console.log("socket connect!");
};

export const socketOnError = () => {};

export const socketOnClose = () => {
  console.log("socket disconnect!");
};

export const socketDisconnect = () => {
  if (socket?.readyState === 1) {
    return () => socket.close();
  }
};
