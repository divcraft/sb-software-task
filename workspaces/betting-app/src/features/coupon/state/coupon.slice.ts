import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BettingState {
  //   displayedOutcomesIds: Array<number>;
  coupon: Array<{
    gameId: number;
    outcomeId: number;
  }>;
  multiplier: number | null;
}

const initialState: BettingState = {
  //   displayedOutcomesIds: [],
  coupon: [],
  multiplier: null,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    // subscribeOutcomesByCountry(state, action: PayloadAction<Array<number>>) {
    //   state.displayedOutcomesIds = action.payload;
    // },
    setCoupon(state, action: PayloadAction<{ gameId: number; outcomeId: number }>) {
      const { gameId, outcomeId } = action.payload;

      if (state.coupon.some((item) => item.gameId === gameId)) {
        if (state.coupon.some((item) => item.outcomeId === outcomeId)) {
          state.coupon = state.coupon.filter((item) => item.outcomeId !== outcomeId);
        } else {
          state.coupon = state.coupon.map((item) => (item.gameId === gameId ? { ...item, outcomeId } : item));
        }
      } else {
        state.coupon.push({ gameId, outcomeId });
      }
    },
    setMultiplier(state, action: PayloadAction<number | null>) {
      state.multiplier = action.payload;
    },
  },
});

export const { setCoupon, setMultiplier } = couponSlice.actions;
export const couponReducer = couponSlice.reducer;
