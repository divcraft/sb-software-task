import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BettingState {
  //   displayedOutcomesIds: Array<number>;
  bets: Array<{
    gameId: number;
    outcomeId: number;
  }>;
  stake: number;
}

const initialState: BettingState = {
  //   displayedOutcomesIds: [],
  bets: [],
  stake: 1,
};

export const betslipSlice = createSlice({
  name: "betslip",
  initialState,
  reducers: {
    // subscribeOutcomesByCountry(state, action: PayloadAction<Array<number>>) {
    //   state.displayedOutcomesIds = action.payload;
    // },
    setBet(state, action: PayloadAction<{ gameId: number; outcomeId: number }>) {
      const { gameId, outcomeId } = action.payload;

      if (state.bets.some((item) => item.gameId === gameId)) {
        if (state.bets.some((item) => item.outcomeId === outcomeId)) {
          state.bets = state.bets.filter((item) => item.outcomeId !== outcomeId);
        } else {
          state.bets = state.bets.map((item) => (item.gameId === gameId ? { ...item, outcomeId } : item));
        }
      } else {
        state.bets.push({ gameId, outcomeId });
      }
    },
    setStake(state, action: PayloadAction<number>) {
      state.stake = action.payload;
    },
  },
});

export const { setBet, setStake } = betslipSlice.actions;
export const betslipReducer = betslipSlice.reducer;
