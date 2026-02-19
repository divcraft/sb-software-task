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
      const { gameId, outcomeId } = action.payload;

      const existingIndex = state.couponOutcomesIds.findIndex(
        (x) => x.gameId === gameId,
      );

      if (existingIndex !== -1) {
        const existing = state.couponOutcomesIds[existingIndex];
        if (existing.outcomeId === outcomeId) {
          state.couponOutcomesIds.splice(existingIndex, 1);
        } else {
          state.couponOutcomesIds[existingIndex] = { gameId, outcomeId };
        }
      } else {
        state.couponOutcomesIds = [...state.couponOutcomesIds, action.payload];
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
