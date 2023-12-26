import MultiAxisGraph from "components/graph/multiAxisGraph";
import RealTimeGraph from "components/graph/realTimeGraph";
import { useEffect, useRef, useState } from "react";
import { selectMachineState } from "src/redux/reducers/machine/machineReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function GraphWrap() {
  const state = useAppSelector(selectMachineState);
  const boxRef = useRef(null);
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div
      className="flex flex-col border border-r-0 w-full overflow-hidden p-4 justify-around"
      ref={boxRef}
    >
      {isMount && state.dataInterval[0] >= 5 && (
        <>
          <MultiAxisGraph
            title="Spindle Load"
            labelArray={state.graphData.labels}
            data={state.graphData.spindle}
            dataTitle={["S1 Load", "S1 Speed"]}
            width={boxRef.current?.clientWidth - 32}
            height={boxRef.current?.clientHeight / 2 - 48}
          />
          <RealTimeGraph
            title="Tool Load"
            labelArray={state.graphData.labels}
            data={state.graphData.tool}
            dataTitle={["X Load", "Z Load"]}
            width={boxRef.current?.clientWidth - 32}
            height={boxRef.current?.clientHeight / 2 - 48}
          />
        </>
      )}
    </div>
  );
}
