import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BettingState {
  displayedOutcomesIds: Array<number>;
  couponOutcomesIds: Array<{
    gameId: number;
    outcomeId: number;
  }>;
  multiplier: number | null;
}

const initialState: BettingState = {
  displayedOutcomesIds: [],
  couponOutcomesIds: [],
  multiplier: null,
};

export const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    subscribeOutcomesByCountry(state, action: PayloadAction<Array<number>>) {
      state.displayedOutcomesIds = action.payload;
    },
    setCouponOutcomeId(
      state,
      action: PayloadAction<{ gameId: number; outcomeId: number }>,
    ) {
      if (
        state.couponOutcomesIds.some(
          (x) => x.outcomeId !== action.payload.outcomeId,
        )
      ) {
        if (
          state.couponOutcomesIds.some(
            (x) => x.gameId === action.payload.gameId,
          )
        ) {
          state.couponOutcomesIds = state.couponOutcomesIds.map((x) =>
            x.gameId === action.payload.gameId ? action.payload : x,
          );
        } else {
          state.couponOutcomesIds.push(action.payload);
        }
      }
    },
    setMultiplier(state, action: PayloadAction<number | null>) {
      state.multiplier = action.payload;
    },
  },
});

export const { subscribeOutcomesByCountry, setCouponOutcomeId, setMultiplier } =
  bettingSlice.actions;
export const bettingReducer = bettingSlice.reducer;
