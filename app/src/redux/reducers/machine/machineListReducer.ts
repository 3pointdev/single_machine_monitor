import { createSlice } from "@reduxjs/toolkit";
import MachineDto from "src/dto/machine/machine.dto";
import mapperInstance from "src/modules/mapper.module";
import { RootState } from "../../store";

export interface MachineListState {
  list: MachineDto[];
}

const initialState: MachineListState = {
  list: [],
};

export const machineListSlice = createSlice({
  name: "machineList",
  initialState,
  reducers: {
    setMachineList: (state, action) => {
      state.list = action.payload.map((machine) =>
        mapperInstance.initialMapper(machine)
      );
    },
  },
});

export const { setMachineList } = machineListSlice.actions;
export const selectMachineListState = (state: RootState) => state.machineList;
export default machineListSlice.reducer;
