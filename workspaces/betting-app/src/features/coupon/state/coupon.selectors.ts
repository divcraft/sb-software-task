import { createSelector } from "@reduxjs/toolkit";
import { EventType } from "shared/types";
import { RootState } from "store";
import { bettingApi } from "features/betting";

const selectState = (state: RootState) => state;

export type CouponSelection = { gameId: number; outcomeId: number };

export type ResolvedCouponItem = {
  gameId: number;
  outcomeId: number;
  eventName: string;
  outcomeName: string;
  odds: number;
};

const selectCouponOutcomes = createSelector([selectState], (state) => {
  const outcomes = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes || {};
  const couponOutcomes = state.coupon.coupon.map((item) => {
    const outcome = outcomes[item.outcomeId];
    const event = bettingApi.endpoints.getEvents.select()(state)?.data?.events[outcome?.eventId ?? 0];
    return {
      gameId: outcome?.gameId ?? 0,
      outcomeId: item.outcomeId,
      eventName: event?.name ?? "Unknown",
      outcomeName: outcome?.name ?? "Unknown",
      odds: outcome?.odds ?? 0,
    };
  });
  return couponOutcomes;
});

export const selectCouponOutcomesIds = createSelector([selectState], (state) => {
  const couponOutcomesIds = state.coupon.coupon.map((item) => item.outcomeId);
  return couponOutcomesIds;
});

export const selectCouponLength = createSelector([selectState], (state) => {
  const couponLength = state.coupon.coupon.length;
  return couponLength;
});

export const selectCouponTotal = createSelector([selectState], (state) => {
  const couponOutcomes = selectCouponOutcomes(state);
  const couponTotal = couponOutcomes.reduce((acc, item) => acc + item.odds, 0);
  return couponTotal.toFixed(2);
});
