import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EventsResponseType } from "shared/types";

export interface BettingState {
  bettingFeed: EventsResponseType;
  subscribedOutcomes: Array<number>;
}

const initialState: BettingState = {
  bettingFeed: [],
  subscribedOutcomes: [],
};

export const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {},
});

export const {} = bettingSlice.actions;
export const bettingReducer = bettingSlice.reducer;
