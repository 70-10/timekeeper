import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

type State = {
  count: number;
  pause: boolean;
};

const initialState: State = {
  count: 10,
  pause: true
};

const counterModule = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      if (state.count + action.payload < 0) {
        state.count = 0;
        return;
      }
      state.count += action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    start: state => {
      state.pause = false;
    },
    stop: state => {
      state.pause = true;
    }
  }
});

export default counterModule;

export function startTime(): AppThunk {
  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
  return async (dispatch, getState) => {
    dispatch(counterModule.actions.start());
    const {
      counter: { count, pause }
    } = getState();

    let val = count;
    let running = !pause;
    while (val >= 0 && running) {
      dispatch(counterModule.actions.setCount(val--));
      await sleep(1000);
      const {
        counter: { pause }
      } = getState();
      running = !pause;
    }
  };
}
