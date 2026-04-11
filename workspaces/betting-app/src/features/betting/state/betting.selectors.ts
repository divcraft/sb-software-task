import { createSelector } from "@reduxjs/toolkit";
import { EventType } from "shared/types";
import { RootState } from "store";
import { bettingApi } from "../api/betting.api";

export type SportGroup = {
  sportName: string;
  events: EventType[];
};

export type CountryGroup = {
  countryName: string;
  events: EventType[];
};

const selectState = (state: RootState) => state;

export const selectIsLoading = createSelector([selectState], (state) => {
  const isLoading = bettingApi.endpoints.getEvents.select()(state)?.isLoading ?? false;
  return isLoading;
});

export const selectIsError = createSelector([selectState], (state) => {
  const isError = bettingApi.endpoints.getEvents.select()(state)?.isError ?? false;
  return isError;
});

export const selectSportIds = createSelector([selectState], (state) => {
  const sportsIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports.ids || [];
  return sportsIds;
});

export const selectCountryIds = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const countryIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports.records[sportId]?.countryIds || [];
  return countryIds;
});

export const selectSportName = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const sportName = bettingApi.endpoints.getEvents.select()(state)?.data?.sports.records[sportId]?.name || "Unknown";
  return sportName;
});

export const selectCountryName = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const countryName =
      bettingApi.endpoints.getEvents.select()(state)?.data?.countries.records[countryId]?.name || "Unknown";
    return countryName;
  },
);

export const selectEventsIds = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const eventsIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.countries.records[countryId]?.eventIds || [];
    return eventsIds;
  },
);

export const selectEventsLength = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const eventsIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.countries.records[countryId]?.eventIds.length || 0;
    return eventsIds;
  },
);

export const selectGamesIds = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const gamesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.events.records[eventId]?.gameIds || [];
  return gamesIds;
});

export const selectEventName = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const eventName = bettingApi.endpoints.getEvents.select()(state)?.data?.events.records[eventId]?.name || "Unknown";
  return eventName;
});

export const selectEventNameByOutcomeId = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const outcome = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records[outcomeId];
    const event = bettingApi.endpoints.getEvents.select()(state)?.data?.events.records[outcome?.eventId ?? 0];
    return event?.name || "Unknown";
  },
);

export const selectOutcomesIds = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const outcomesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.games.records[gameId]?.outcomeIds || [];
  return outcomesIds;
});

export const selectGameName = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const gameName = bettingApi.endpoints.getEvents.select()(state)?.data?.games.records[gameId]?.name || "Unknown";
  return gameName;
});

export const selectOutcome = createSelector([selectState, (_, outcomeId: number) => outcomeId], (state, outcomeId) => {
  const outcome = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records[outcomeId] || null;
  return outcome;
});

export const selectOutcomeName = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const outcomeName =
      bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records[outcomeId]?.name || "Unknown";
    return outcomeName;
  },
);

export const selectOutcomeOdds = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const outcomeOdds = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records[outcomeId]?.odds || 0;
    return outcomeOdds.toFixed(2);
  },
);

// ---

export type CouponSelection = { gameId: number; outcomeId: number };

export type ResolvedCouponItem = {
  gameId: number;
  outcomeId: number;
  eventName: string;
  outcomeName: string;
  odds: number;
};

const selectCouponOutcomes = createSelector([selectState], (state) => {
  const outcomes = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records || {};
  const couponOutcomes = state.betting.coupon.map((item) => {
    const outcome = outcomes[item.outcomeId];
    const event = bettingApi.endpoints.getEvents.select()(state)?.data?.events.records[outcome?.eventId ?? 0];
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
  const couponOutcomesIds = state.betting.coupon.map((item) => item.outcomeId);
  return couponOutcomesIds;
});

export const selectCouponLength = createSelector([selectState], (state) => {
  const couponLength = state.betting.coupon.length;
  return couponLength;
});

export const selectCouponTotal = createSelector([selectState], (state) => {
  const couponOutcomes = selectCouponOutcomes(state);
  const couponTotal = couponOutcomes.reduce((acc, item) => acc + item.odds, 0);
  return couponTotal.toFixed(2);
});

// export const selectCouponItem = createSelector(
//   [selectState, (_: any, outcomeId: number) => outcomeId],
//   (state, outcomeId) => {
//     const couponItem = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records[outcomeId];
//     return couponItem;
//   },
// );
