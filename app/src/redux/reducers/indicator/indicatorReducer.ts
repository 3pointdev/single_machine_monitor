import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IndicatorState {
  activeCount: number;
}

const initialState: IndicatorState = {
  activeCount: 0,
};

export const indicatorSlice = createSlice({
  name: "indicator",
  initialState,
  reducers: {
    increaseIndicatorState: (state) => {
      state.activeCount = state.activeCount + 1;
    },
    decreaseIndicatorState: (state) => {
      if (state.activeCount > 0) {
        state.activeCount = state.activeCount - 1;
      }
    },
  },
});

export const { increaseIndicatorState, decreaseIndicatorState } =
  indicatorSlice.actions;
export const selectIndicatorState = (state: RootState) => state.indicator;
export default indicatorSlice.reducer;
