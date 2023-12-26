import MachiningHistoryGraph from "components/graph/machiningHistoryGraph";
import DataPanelWrap from "components/wrap/dataPanelWrap";
import GraphWrap from "components/wrap/graphWrap";
import InfomationWrap from "components/wrap/infomationWrap";
import { useEffect } from "react";
import { getMachineList } from "src/redux/actions/fetchInitialize";
import { socketDisconnect } from "src/redux/actions/socket";
import {
  dataReset,
  setMachineStat,
  updateMachine,
} from "src/redux/reducers/machine/machineReducer";
import { useAppDispatch } from "src/redux/reduxHook";

export default function Monitor(props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = +props.router.asPath.split("=")[1];
    dispatch(getMachineList(id, socketOnMessage));

    // // 25분마다 소켓연결을 끊고 다시 연결함
    // const intervalId = setInterval(() => {
    //   console.log("소켓 재연결", dayjs().format("HH:mm:ss"));
    //   dispatch(socketDisconnect());
    //   dispatch(getMachineList(id, socketOnMessage));
    // }, 1500000);

    // 2시간마다 새로고침함
    setTimeout(() => {
      location.reload();
    }, 1500000);

    return () => {
      // clearInterval(intervalId);
      dispatch(dataReset());
      dispatch(socketDisconnect());
    };
  }, []);

  const socketOnMessage = async (message) => {
    if (typeof message.data === "string") {
      const object = JSON.parse(message.data);
      const id = props.router.asPath.split("=")[1];
      const target = object.data.find((machine) => +machine.Id === +id);
      dispatch(setMachineStat(target));
    } else {
      const updateData = await message.data.text();
      const dataArray = updateData.split("|");
      dispatch(updateMachine(dataArray));
    }
  };

  return (
    <article className="text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] p-4 overflow-hidden">
      <section className="flex w-full h-1/2">
        <InfomationWrap />
        <GraphWrap />
        <DataPanelWrap />
      </section>
      <section className="border flex w-full h-1/2">
        <div className="w-1/4"></div>
        <MachiningHistoryGraph />
      </section>
    </article>
  );
}
