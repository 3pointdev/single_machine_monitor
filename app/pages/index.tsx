import Machine from "components/machine/machine";
import { useEffect } from "react";
import MachineDto from "src/dto/machine/machine.dto";
import { getMachineList } from "src/redux/actions/fetchMachine";
import { selectMachineListState } from "src/redux/reducers/machine/machineListReducer";
import { dataReset } from "src/redux/reducers/machine/machineReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectMachineListState);
  useEffect(() => {
    dispatch(getMachineList());

    return () => {
      dispatch(dataReset());
    };
  }, []);

  return (
    <article className="text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] p-4 overflow-hidden grid grid-cols-4 gap-4">
      {state.list.map((machine: MachineDto) => {
        return <Machine data={machine} key={`${machine.mid}_${machine.id}`} />;
      })}
    </article>
  );
}
