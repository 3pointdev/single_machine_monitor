import { MachineTextType } from "config/constants";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { selectMachineState } from "src/redux/reducers/machine/machineReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function InfomationWrap() {
  const state = useAppSelector(selectMachineState);
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setTime(dayjs().format("MM/DD HH:mm"));
  }, []);

  useEffect(() => {}, [state.machine.execution]);

  return (
    <div className="flex flex-col border border-r-0 justify-around font-semibold text-[2vh] p-2 min-w-[16%]">
      <p className="border p-2 h-[10%]">{time}</p>
      <p className="border p-2 h-[10%]">{`작업자 : ${state.machine.worker}`}</p>
      <p className="border p-2 h-[10%]">{`기계 : ${state.machine.mid}`}</p>
      <p className={`border p-2 h-[10%] ${state.machine.execution}`}>{`상태 : ${
        MachineTextType[state.machine.execution]
      }`}</p>
      {/* <p className="border p-2">{state.machine.uptime}</p> */}
      <p className="border p-2 h-[10%]">{state.machine.program}</p>
      <p className="border p-2 h-[10%]">{`생산량 : ${state.machine.partCount} 개`}</p>
      <p className="border p-2 h-[10%]">{`목표량 : ${state.machine.planCount} 개`}</p>
      <p className="border p-2 h-[10%]">{`Cycle Time : ${dayjs(
        state.machine.cycleTime
      ).format("mm:ss")}`}</p>
    </div>
  );
}
