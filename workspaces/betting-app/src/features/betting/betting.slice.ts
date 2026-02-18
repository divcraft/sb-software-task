import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventsResponseType } from "shared/types";

export interface BettingState {
  bettingFeed: EventsResponseType;
}

const initialState: BettingState = {
  bettingFeed: [],
};

export const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    setBettingFeed(state, action: PayloadAction<EventsResponseType>) {
      state.bettingFeed = action.payload;
    },
  },
});

export const { setBettingFeed } = bettingSlice.actions;
export const bettingReducer = bettingSlice.reducer;
