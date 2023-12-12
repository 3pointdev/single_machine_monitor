import { createSlice } from "@reduxjs/toolkit";
import {
  default as JoinModel,
  default as LoginModel,
} from "src/models/login/login.model";
import { RootState } from "../../store";

export interface LoginState {
  model: LoginModel;
  errorMessage: string | null;
}

const initialState: LoginState = {
  model: { ...new JoinModel() },
  errorMessage: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeLoginValue: (state, action) => {
      const { id, value } = action.payload;

      state.model[id] = value;
    },

    postLogin: (state, action) => {
      if (action.payload.success) {
        window.localStorage.setItem("enterprise", action.payload.enterprise);
        window.localStorage.setItem(
          "enterprise_id",
          action.payload.enterprise_id
        );
        window.localStorage.setItem("name", action.payload.name);
        window.localStorage.setItem("token", action.payload.token);
        location.replace("/");
      } else {
        state.errorMessage = action.payload.msg;
      }
    },
  },
});

export const { changeLoginValue, postLogin } = loginSlice.actions;
export const selectLoginState = (state: RootState) => state.login;
export default loginSlice.reducer;
