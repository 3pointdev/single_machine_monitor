import { useEffect, useRef, useState } from "react";
import { selectMachineState } from "src/redux/reducers/machine/machineReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function DataPanelWrap() {
  const [mount, setMount] = useState<boolean>(false);
  const state = useAppSelector(selectMachineState);
  const xLoadRef = useRef<HTMLImageElement>(null);
  const zLoadRef = useRef<HTMLImageElement>(null);
  const s1LoadRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const newData = state.machine.graphData[state.machine.graphData.length - 1];
    const xLoad = mapInputToRange(newData?.loadX);
    const zLoad = mapInputToRange(newData?.loadZ);
    const s1Load = mapInputToRange(newData?.loadS1);

    if (xLoadRef.current) {
      xLoadRef.current.style.transform = `rotate(${xLoad}deg) translateX(-50%) translateY(50%) scale(250%)`;
    }
    if (zLoadRef.current) {
      zLoadRef.current.style.transform = `rotate(${zLoad}deg) translateX(-50%) translateY(50%) scale(250%)`;
    }
    if (s1LoadRef.current) {
      s1LoadRef.current.style.transform = `rotate(${s1Load}deg) translateX(-50%) translateY(50%) scale(250%)`;
    }
  }, [state.machine.graphData]);

  useEffect(() => {
    setMount(true);
  }, []);

  const mapInputToRange = (input: number) => {
    const validInput = Math.max(input, 0);

    if (validInput > 160) {
      return 90;
    }

    const percentage = (validInput / 160) * 100;

    const mappedValue = percentage * 1.8 - 90;

    const roundedValue = Math.round(mappedValue);

    return roundedValue;
  };

  if (mount)
    return (
      <div className="flex flex-col border w-1/4 h-full justify-around shrink-0">
        <div className="grid w-full h-full instrument_panel">
          <div className="col-start-1 relative">
            <h2 className="absolute p-4 top-0 left-0">S1 Load</h2>
            <img
              src="/panel.svg"
              className="w-full h-[84%]"
              alt="instrument_panel_background"
            />
            <img
              src="/pin.svg"
              className="absolute top-[60%] left-1/2 -translate-x-1/2 translate-y-1/2 scale-[250%] transition-all duration-500"
              alt="instrument_panel"
              ref={s1LoadRef}
            />
            <div className="absolute flex w-full items-center justify-between pl-3">
              <p>0</p>
              <p>150</p>
            </div>
            <p className="absolute bottom-1/3 left-1/2 -translate-x-1/2 font-semibold text-2xl">
              {
                state.machine.graphData[state.machine.graphData.length - 1]
                  ?.loadS1
              }
            </p>
          </div>
          <div className="col-start-1 relative">
            <h2 className="absolute p-4 top-0 left-0">X Load</h2>
            <img
              src="/panel.svg"
              className="w-full h-[84%]"
              alt="instrument_panel_background"
            />
            <img
              src="/pin.svg"
              className="absolute top-[60%] left-1/2 -translate-x-1/2 translate-y-1/2 scale-[250%] transition-all duration-500"
              alt="instrument_panel"
              ref={xLoadRef}
            />
            <div className="absolute flex w-full items-center justify-between pl-3">
              <p>0</p>
              <p>150</p>
            </div>
            <p className="absolute bottom-1/3 left-1/2 -translate-x-1/2 font-semibold text-2xl">
              {
                state.machine.graphData[state.machine.graphData.length - 1]
                  ?.loadX
              }
            </p>
          </div>

          <div className="col-start-1 relative">
            <h2 className="absolute p-4 top-0 left-0">Z Load</h2>
            <img
              src="/panel.svg"
              className="w-full h-[84%]"
              alt="instrument_panel_background"
            />
            <img
              src="/pin.svg"
              className="absolute top-[60%] left-1/2 -translate-x-1/2 translate-y-1/2 scale-[250%] transition-all duration-500"
              alt="instrument_panel"
              ref={zLoadRef}
            />
            <div className="absolute flex w-full items-center justify-between pl-3">
              <p>0</p>
              <p>150</p>
            </div>
            <p className="absolute bottom-1/3 left-1/2 -translate-x-1/2 font-semibold text-2xl">
              {
                state.machine.graphData[state.machine.graphData.length - 1]
                  ?.loadZ
              }
            </p>
          </div>
          <div className="row-start-1 col-start-2 flex flex-col items-center justify-center">
            <p>History</p>
            <p>{`최대 부하값 : ${state.machine.peakData.loadS1}`}</p>
            <p>{`발생시각 : ${state.machine.peakData.timeS1}`}</p>
          </div>
          <div className="row-start-2 col-start-2 flex flex-col items-center justify-center">
            <p>History</p>
            <p>{`최대 부하값 : ${state.machine.peakData.loadX}`}</p>
            <p>{`발생시각 : ${state.machine.peakData.timeX}`}</p>
          </div>
          <div className="row-start-3 col-start-2 flex flex-col items-center justify-center">
            <p>History</p>
            <p>{`최대 부하값 : ${state.machine.peakData.loadZ}`}</p>
            <p>{`발생시각 : ${state.machine.peakData.timeZ}`}</p>
          </div>
        </div>
      </div>
    );
}
