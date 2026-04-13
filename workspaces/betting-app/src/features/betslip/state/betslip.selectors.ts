import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";
import { selectBettingFeed } from "features/betting-feed";

const selectState = (state: RootState) => state;

const selectBetslipOutcomes = createSelector([selectState], (state) => {
  const bettingFeed = selectBettingFeed(state);
  const outcomes = bettingFeed?.outcomes ?? {};

  const betslipOutcomes = state.betslip.bets.map((item) => {
    const outcome = outcomes[item.outcomeId];
    const event = bettingFeed?.events[outcome.eventId];

    if (!event) {
      throw Error(`selectBetslipOutcomes - cannot fimd event with ID: ${outcome.eventId}`);
    }

    return {
      gameId: outcome.gameId,
      outcomeId: item.outcomeId,
      eventName: event.name,
      outcomeName: outcome.name,
      odds: outcome.odds,
    };
  });
  return betslipOutcomes;
});

export const selectBetslipOutcomesIds = createSelector([selectState], (state) => {
  const betslipOutcomesIds = state.betslip.bets.map((item) => item.outcomeId);
  return betslipOutcomesIds;
});

export const selectBetslipLength = createSelector([selectState], (state) => {
  const betslipLength = state.betslip.bets.length;
  return betslipLength;
});

export const selectBetslipTotal = createSelector([selectState], (state) => {
  const betslipOutcomes = selectBetslipOutcomes(state);
  const betslipTotal = betslipOutcomes.reduce((acc, item) => acc + item.odds, 0);
  return betslipTotal.toFixed(2);
});
