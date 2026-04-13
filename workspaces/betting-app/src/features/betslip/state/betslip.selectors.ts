import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";
import { selectBettingFeed } from "features/betting-feed";

const selectState = (state: RootState) => state;

const selectCouponOutcomes = createSelector([selectState], (state) => {
  const bettingFeed = selectBettingFeed(state);
  const outcomes = bettingFeed?.outcomes ?? {};

  const couponOutcomes = state.betslip.bets.map((item) => {
    const outcome = outcomes[item.outcomeId];
    const event = bettingFeed?.events[outcome.eventId];

    if (!event) {
      throw Error(`selectCouponOutcomes - cannot fimd event with ID: ${outcome.eventId}`);
    }

    return {
      gameId: outcome.gameId,
      outcomeId: item.outcomeId,
      eventName: event.name,
      outcomeName: outcome.name,
      odds: outcome.odds,
    };
  });
  return couponOutcomes;
});

export const selectCouponOutcomesIds = createSelector([selectState], (state) => {
  const couponOutcomesIds = state.betslip.bets.map((item) => item.outcomeId);
  return couponOutcomesIds;
});

export const selectCouponLength = createSelector([selectState], (state) => {
  const couponLength = state.betslip.bets.length;
  return couponLength;
});

export const selectCouponTotal = createSelector([selectState], (state) => {
  const couponOutcomes = selectCouponOutcomes(state);
  const couponTotal = couponOutcomes.reduce((acc, item) => acc + item.odds, 0);
  return couponTotal.toFixed(2);
});
