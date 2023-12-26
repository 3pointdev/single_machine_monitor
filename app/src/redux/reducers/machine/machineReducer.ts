import { createSlice } from "@reduxjs/toolkit";
import GraphDataDto from "src/dto/graph/graph.dto";
import MachineDto from "src/dto/machine/machine.dto";
import mapperInstance from "src/modules/mapper.module";
import { RootState } from "../../store";

export interface MachineState {
  machine: MachineDto;
  graphData: IGraph;
  dataInterval: number[];
  isInitial: boolean;
}

export interface IGraph {
  labels: any[];
  spindle: number[][];
  tool: number[][];
}

const initialState: MachineState = {
  machine: new MachineDto(),
  graphData: {
    labels: [],
    spindle: [[], []],
    tool: [[], []],
  },
  dataInterval: [0, 0],
  isInitial: false,
};

export const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    dataReset: (state) => {
      state = initialState;
    },
    initialMachine: (state, action) => {
      state.dataInterval = [0, 0];
      state.isInitial = false;

      state.machine = mapperInstance.initialMapper(action.payload);
    },
    setMachineStat: (state, action) => {
      const mapping = mapperInstance.statMapper(action.payload, state.machine);
      state.machine = mapping;

      state.graphData = graphMap(mapping.graphData);
      state.isInitial = true;
    },
    updateMachine: (state, action) => {
      if (state.isInitial === false) return;

      if (state.dataInterval[0] === 1) {
        state.dataInterval = [state.dataInterval[0], new Date().getTime()];
      } else if (state.dataInterval[0] === 2) {
        const count = 60000 / (Date.now() - state.dataInterval[1]);
        const array = [...new Array(Math.floor(count))];
        const label = array.map((value, index) =>
          Math.floor(index / (count / 60))
        );
        const dummy = array.map(() => 0);
        const graph = array.map((value, index) => {
          return {
            ...new GraphDataDto(),
            time: Math.floor(
              new Date().getTime() - (60000 - index * (60000 / count))
            ),
          };
        });

        state.machine = { ...state.machine, graphData: graph };
        state.graphData = {
          labels: label,
          spindle: [dummy, dummy],
          tool: [dummy, dummy],
        };
      } else if (state.dataInterval[0] >= 3) {
        const mapping = mapperInstance.updateMapper(
          action.payload,
          state.machine
        );

        state.machine = mapping;
        state.graphData = graphMap(mapping.graphData);
      }
      if (action.payload[0] !== "EXTRA") {
        state.dataInterval = [state.dataInterval[0] + 1, state.dataInterval[1]];
      }
    },
    setWorker: (state, action) => {
      let machine = state.machine;

      machine.worker = action.payload.worker;

      state.machine = machine;
    },
  },
});

export const {
  initialMachine,
  setMachineStat,
  updateMachine,
  setWorker,
  dataReset,
} = machineSlice.actions;
export const selectMachineState = (state: RootState) => state.machine;
export default machineSlice.reducer;

const graphMap = (graphData: GraphDataDto[]) => {
  if (graphData.length > 0) {
    let labelList = [];
    let spindle = [[], []];
    let tool = [[], []];

    for (let i = 0; i < graphData.length; i++) {
      const target = graphData[i];

      const label = Math.round((Date.now() - target.time) / 5000) * 5;

      labelList.push(label);
      spindle[0].push(target.loadS1);
      spindle[1].push(target.speedS1);
      tool[0].push(target.loadX);
      tool[1].push(target.loadZ);
    }

    return { labels: labelList, spindle: spindle, tool: tool };
  }
};
